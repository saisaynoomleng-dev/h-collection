import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import db from '@/db';
import { UserTable } from '@/db/schema';
import { clerkDataSchema } from '@/types/validations';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req);

    const type = event.type;

    if (type === 'user.created' || type == 'user.updated') {
      const { data } = event;

      const result = clerkDataSchema.safeParse(data);

      if (!result.success) {
        return NextResponse.json(
          { message: 'Invalid Data Entity' },
          { status: 422 },
        );
      }

      const {
        first_name,
        last_name,
        email_addresses,
        image_url,
        primary_email_address_id,
        id,
      } = result.data;

      const primaryEmail = email_addresses.find(
        (email) => email.id === primary_email_address_id,
      );

      if (!primaryEmail) {
        return NextResponse.json(
          { message: 'Email Not found' },
          { status: 400 },
        );
      }

      await db
        .insert(UserTable)
        .values({
          clerkUserId: id,
          firstName: first_name || '',
          lastName: last_name || '',
          email: primaryEmail.email_address,
          imageUrl: image_url,
          isActive: true,
        })
        .onConflictDoUpdate({
          target: UserTable.clerkUserId,
          set: {
            firstName: first_name || '',
            lastName: last_name || '',
            email: primaryEmail.email_address,
            imageUrl: image_url,
            updatedAt: new Date(),
            isActive: true,
          },
        });

      return NextResponse.json({ ok: true });
    }

    if (type === 'user.deleted') {
      if (event.data.id != null) {
        await db
          .update(UserTable)
          .set({
            isActive: false,
          })
          .where(eq(UserTable.clerkUserId, event.data.id));
      }

      return NextResponse.json({ ok: true });
    }
  } catch (error: any) {
    console.error('DB error', error);
    return NextResponse.json({ message: 'MISSING WEBHOOK' }, { status: 400 });
  }
}
