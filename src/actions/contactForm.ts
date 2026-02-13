'use server';

import contactEmailTemplate from '@/components/features/contactEmailTemplate';
import db from '@/db';
import { ContactTable } from '@/db/schema';
import resend from '@/emails';
import { ContactFormPrevStateProps } from '@/types/types';
import { contactFormSchemas } from '@/types/validations';

export const handleContactForm = async (
  prevState: ContactFormPrevStateProps,
  formData: FormData,
): Promise<ContactFormPrevStateProps> => {
  try {
    const rawData = {
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    const result = contactFormSchemas.safeParse(rawData);

    if (!result.success) {
      const firstError = result.error.issues[0];

      return {
        status: 'error',
        message: firstError.message,
        field: firstError.path[0] as string,
      };
    }

    const { firstname, lastname, email, phone, subject, message } = result.data;

    await db.insert(ContactTable).values({
      name: `${firstname} ${lastname}`,
      email,
      phone,
      subject,
      message,
    });

    const emailRes = await resend.emails.send({
      from: 'H Collection <noreply@contact.snoomleng.com>',
      to: [email],
      subject: `Reply to: ${subject}`,
      react: contactEmailTemplate({ name: `${firstname} ${lastname}` }),
    });

    if (emailRes.error) {
      console.log('email not sent');
    } else {
      console.log('email sent');
    }

    return {
      status: 'success',
      message: "Thank you so much for contacting us! We'll be in touch!",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Something went wrong!',
    };
  }
};
