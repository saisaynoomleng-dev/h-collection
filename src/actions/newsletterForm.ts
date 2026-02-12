'use server';

import db from '@/db';
import { NewsletterSubscriptionsTable } from '@/db/schema';
import { NewsletterFormPrevStateProps } from '@/types/types';
import { newsletterFormSchemas } from '@/types/validations';

export const handleNewsletterForm = async (
  prevState: NewsletterFormPrevStateProps,
  formData: FormData,
): Promise<NewsletterFormPrevStateProps> => {
  try {
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
    };

    const result = newsletterFormSchemas.safeParse(rawData);

    if (!result.success) {
      const firstError = result.error.issues[0];

      return {
        status: 'error',
        message: firstError.message,
        field: firstError.path[0] as string,
      };
    }

    const { name, email } = result.data;

    await db
      .insert(NewsletterSubscriptionsTable)
      .values({
        name,
        email,
      })
      .onConflictDoNothing({ target: NewsletterSubscriptionsTable.email });

    return {
      status: 'success',
      message: 'Thank you for your subscription!',
    };
  } catch (error: any) {
    console.log(`Error`, error.message);

    return {
      status: 'error',
      message: 'Something went wrong! Try again later!',
    };
  }
};
