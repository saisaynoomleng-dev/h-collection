'use client';

import { handleNewsletterForm } from '@/actions/newsletterForm';
import Form from 'next/form';
import { useActionState } from 'react';
import { Input } from '../ui/input';
import SubmitButton from '../shared/SubmitButton';
import clsx from 'clsx';

const initialFormState = {
  status: '',
  message: '',
  field: '',
};

const NewsletterForm = ({ className }: { className?: string }) => {
  const [state, actionFunction] = useActionState(
    handleNewsletterForm,
    initialFormState,
  );
  return (
    <Form
      action={actionFunction}
      className={clsx('flex flex-col gap-y-3', className)}
    >
      <div className="space-y-1">
        <label htmlFor="newsletter-form-name" className="form-label">
          Name
        </label>
        <Input
          type="text"
          name="name"
          id="newsletter-form-name"
          required
          placeholder="john doe"
          autoComplete="name"
        />
        {state.status === 'error' && state.field === 'name' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="newsletter-form-email" className="form-label">
          Email
        </label>
        <Input
          type="email"
          name="email"
          id="newsletter-form-email"
          required
          placeholder="johndoe@example.com"
          autoComplete="email"
        />
        {state.status === 'error' && state.field === 'email' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <SubmitButton>Send</SubmitButton>
    </Form>
  );
};

export default NewsletterForm;
