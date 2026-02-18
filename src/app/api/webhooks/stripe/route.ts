import db from '@/db';
import { GiftCardOrderTable } from '@/db/schema';
import resend from '@/emails';
import { env } from '@/lib/env/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  console.log('webhook received');
  let event: Stripe.Event;

  try {
    const signature = (await headers()).get('stripe-signature');
    const body = await req.text();

    if (!signature) {
      return NextResponse.json(
        { message: 'Missing Stripe Signature' },
        { status: 401 },
      );
    }

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_GIFTCARD_WEBHOOK_SECRET,
    );
  } catch (error: any) {
    const errorMessage = error.message;
    if (error) console.error(error);

    return NextResponse.json(
      {
        message: `Webhook Error: ${errorMessage}`,
      },
      { status: 401 },
    );
  }

  const permittedEvents = ['checkout.session.completed'];
  console.log('event permitted');

  if (permittedEvents.includes(event.type)) {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      if (event.type === 'checkout.session.completed') {
        await db.update(GiftCardOrderTable).set({
          stripeCheckoutSessionId: session.id,
          stripePaymentIntentId: session.payment_intent as string,
          status: 'active',
          amountInCents: session.amount_total ?? 0,
        });
      }
    } catch (error) {
      return NextResponse.json(
        { message: 'Webhook handler failed' },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ message: 'Payment Received' }, { status: 200 });
}
