'use client';

import { handleContactForm } from '@/actions/contactForm';
import Form from 'next/form';
import { useActionState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import SubmitButton from '../shared/SubmitButton';

const initialFormState = {
  status: '',
  message: '',
  field: '',
};

const ContactForm = () => {
  const [state, actionFunction] = useActionState(
    handleContactForm,
    initialFormState,
  );

  return (
    <Form action={actionFunction} className="grid grid-cols-2 gap-y-3 gap-x-2">
      <div className="space-y-1">
        <label htmlFor="contact-firstname" className="form-label">
          First Name
        </label>
        <Input
          type="text"
          id="contact-firstname"
          name="firstname"
          autoComplete="first-name"
          required
        />
        {state.status === 'error' && state.field === 'firstname' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="contact-lastname" className="form-label">
          Last Name
        </label>
        <Input
          type="text"
          id="contact-lastname"
          name="lastname"
          autoComplete="last-name"
          required
        />
        {state.status === 'error' && state.field === 'lastname' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="contact-email" className="form-label">
          Email
        </label>
        <Input
          type="email"
          id="contact-email"
          name="email"
          autoComplete="email"
          required
        />
        {state.status === 'error' && state.field === 'email' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="contact-phone" className="form-label">
          Phone
        </label>
        <Input
          type="text"
          id="contact-phone"
          name="phone"
          autoComplete="phone"
          required
        />
        {state.status === 'error' && state.field === 'phone' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-1 col-span-full">
        <label htmlFor="contact-subject" className="form-label">
          Subject
        </label>
        <Input type="text" id="contact-subject" name="subject" required />
        {state.status === 'error' && state.field === 'subject' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-1 col-span-full">
        <label htmlFor="contact-message" className="form-label">
          Message
        </label>

        <Textarea name="message" id="contact-message"></Textarea>

        {state.status === 'error' && state.field === 'message' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <SubmitButton className="rounded-none col-start-2">Send</SubmitButton>
    </Form>
  );
};

export default ContactForm;
