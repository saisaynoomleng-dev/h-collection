'use client';

import { handleGiftCardCheckout } from '@/actions/giftCardCheckout';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import SubmitButton from '@/components/shared/SubmitButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import Form from 'next/form';
import Image from 'next/image';
import { useActionState, useState } from 'react';

const AMOUNT_LIST = [
  { name: '$100', value: 100 },
  { name: '$150', value: 150 },
  { name: '$200', value: 200 },
  { name: '$250', value: 250 },
  { name: '$300', value: 300 },
];

const initialFormState = {
  status: '',
  message: '',
  field: '',
};

const BuyGiftCard = () => {
  const [state, actionFunction] = useActionState(
    handleGiftCardCheckout,
    initialFormState,
  );

  const [amount, setAmount] = useState<number>(100);

  return (
    <Bounded isPadded>
      <PageTitle>Buy Gift Card</PageTitle>

      <div className="grid md:grid-cols-2 gap-x-5 gap-y-8">
        <div className="overflow-hidde">
          <Image
            src="/gift-card.jpg"
            alt="gift card"
            width={400}
            height={400}
            priority
            className=""
          />
        </div>

        <div className="flex flex-col gap-y-3">
          <p className="font-semibold text-fs-500">eGift Card</p>
          <p className="text-fs-500">${amount}</p>
          <p>
            You can&apos;t go wrong with a gift card. Choose an amount and write
            a personalized message to make this gift your own.
          </p>

          <div className="space-y-2">
            <p>Amount</p>
            <div className="flex gap-x-3 items-center">
              {AMOUNT_LIST.map((l) => (
                <Button
                  variant="faq"
                  key={l.value}
                  onClick={() => setAmount(l.value)}
                  className={clsx(amount === l.value && 'bg-brand-pink')}
                >
                  {l.name}
                </Button>
              ))}
            </div>
          </div>

          <Form action={actionFunction} className="flex flex-col gap-y-3">
            <input hidden type="number" value={amount} name="amount" readOnly />

            <div className="space-y-3">
              <label htmlFor="gift-card-email" className="form-label">
                Email
              </label>
              <Input type="email" id="gift-card-email" name="email" />
              {state.status === 'error' && (
                <p className="form-error-message">
                  {state.message} {state.field}
                </p>
              )}
            </div>

            <SubmitButton>Buy Now</SubmitButton>
          </Form>
        </div>
      </div>
    </Bounded>
  );
};

export default BuyGiftCard;
