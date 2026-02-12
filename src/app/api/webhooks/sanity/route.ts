import { env } from '@/lib/env/server';
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import db from '@/db';
import { ProductTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { sanityWebhookPayloadSchema } from '@/types/validations';

export async function POST(req: NextRequest) {
  try {
    const operation = req.headers.get('sanity-operation');

    const { body, isValidSignature } = await parseBody<any>(
      req,
      env.SANITY_WEBHOOK_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid Signature' },
        { status: 401 },
      );
    }

    const result = sanityWebhookPayloadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid Body Content' },
        { status: 422 },
      );
    }

    const { slug, price, _id, numberInStock, name, sku, mainImages } =
      result.data;

    if (operation === 'delete') {
      await db
        .update(ProductTable)
        .set({
          isDeleted: true,
          updatedAt: new Date(),
        })
        .where(eq(ProductTable.sanityId, _id));

      return NextResponse.json({ message: 'Product Deleted' }, { status: 200 });
    }

    await db
      .insert(ProductTable)
      .values({
        sanityId: _id,
        sanitySku: sku,
        sanitySlug: slug.current,
        priceInCents: Math.round(price * 100),
        productInStock: numberInStock,
        imageUrl: mainImages[0].asset.url,
        name,
      })
      .onConflictDoUpdate({
        target: ProductTable.sanityId,
        set: {
          name,
          sanitySlug: slug.current,
          priceInCents: Math.round(price * 100),
          productInStock: body.numberInStock,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error(`[WEBHOOK ERROR]: ${error.message}`);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
