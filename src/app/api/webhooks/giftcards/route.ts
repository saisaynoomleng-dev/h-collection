import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { env } from '@/lib/env/server';
import { sanityGiftCardWebhookPayload } from '@/types/validations';
import db from '@/db';
import { GiftCardTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const operation = req.headers.get('sanity-operation');

    const { isValidSignature, body } = await parseBody<any>(
      req,
      env.SANITY_WEBHOOK_GIFTCARD_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Inalid Signature' },
        { status: 401 },
      );
    }

    const result = sanityGiftCardWebhookPayload.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: 'Invalid Entity' }, { status: 422 });
    }

    const { name, slug, amount, _id } = result.data;

    if (operation === 'delete') {
      await db
        .update(GiftCardTable)
        .set({
          isDeleted: true,
        })
        .where(eq(GiftCardTable.id, _id));
    }

    await db
      .insert(GiftCardTable)
      .values({
        name,
        sanityId: _id,
        sanitySlug: slug.current,
        amountInCents: Math.round(amount * 100),
      })
      .onConflictDoNothing({ target: GiftCardTable.sanityId });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
