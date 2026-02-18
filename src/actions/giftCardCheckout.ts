'use server';

import db from '@/db';
import { GiftCardOrderTable } from '@/db/schema';
import resend from '@/emails';
import { env } from '@/lib/env/client';
import { stripe } from '@/lib/stripe';
import { FormPrevStateProps } from '@/types/types';
import { giftCardCheckoutSchema } from '@/types/validations';
import { randomInt } from 'crypto';
import { redirect } from 'next/navigation';

const generateCode = (length: number) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomSet = randomInt(0, charset.length);
    result += charset[randomSet];

    if ((i + 1) % 4 === 0 && i !== length - 1) {
      result += '-';
    }
  }

  return result;
};

export const handleGiftCardCheckout = async (
  prevState: FormPrevStateProps,
  formData: FormData,
): Promise<FormPrevStateProps> => {
  let checkoutUrl: string;
  try {
    const rawData = {
      email: formData.get('email'),
      amount: formData.get('amount'),
    };

    const result = giftCardCheckoutSchema.safeParse(rawData);

    if (!result.success) {
      const firstError = result.error.issues[0];

      return {
        status: 'error',
        message: firstError.message,
        field: firstError.path[0] as string,
      };
    }

    const { email, amount } = result.data;
    const code = generateCode(16);

    const [newOrder] = await db
      .insert(GiftCardOrderTable)
      .values({
        amountInCents: Math.round(amount * 100),
        email,
        code,
        status: 'active',
      })
      .returning({ id: GiftCardOrderTable.id });

    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: Math.round(amount * 100),
            product_data: {
              name: `${amount} eGift Card`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        code,
      },
      mode: 'payment',
      success_url: `${env.NEXT_PUBLIC_APP_URL}/buy-gift-card/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/`,
    });

    if (!session.url) {
      return {
        status: 'error',
        message: 'Failed to create checkout session',
      };
    }

    checkoutUrl = session.url;

    console.log('payment action success');

    const resendEmail = await resend.emails.send({
      from: 'H Collection <noreply@contact.snoomleng.com>',
      to: email,
      subject: 'Giftcard purchase',
      html: `Code: ${code}`,
    });

    if (resendEmail.error) {
      console.log('email not sent');
    } else {
      console.log('email sent');
    }
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Something went Wrong',
    };
  }
  redirect(checkoutUrl);
};
