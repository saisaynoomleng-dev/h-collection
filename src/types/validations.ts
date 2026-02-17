import z from 'zod';

export const sanityWebhookPayloadSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  sku: z.string(),
  price: z.number(),
  numberInStock: z.number(),
  mainImages: z.array(
    z.object({
      asset: z.object({
        url: z.string(),
      }),
    }),
  ),
});

export const newsletterFormSchemas = z.object({
  name: z.string().min(5, 'Name must have at least 5 characters'),
  email: z.email(),
});

export const contactFormSchemas = z.object({
  firstname: z.string().min(2, 'Name must have at least 2 characters'),
  lastname: z.string().min(2, 'Name must have at least 2 characters'),
  email: z.email(),
  phone: z.string().min(5, 'Phone number must have at least 5 characters'),
  subject: z.string().min(10, 'Subject must have at least 10 characters'),
  message: z
    .string()
    .min(100, 'Message text should have at least 100 characters'),
});

export const clerkDataSchema = z.object({
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email_addresses: z.array(
    z.object({
      id: z.string(),
      email_address: z.email(),
    }),
  ),
  id: z.string(),
  image_url: z.string(),
  primary_email_address_id: z.string(),
});

export const applicationFormSchema = z.object({
  firstName: z.string().min(1, 'Name must have at least one characters'),
  lastName: z.string().min(1, 'Name must have at least one characters'),
  email: z.email(),
  positionId: z.string(),
  positionName: z.string(),
  employerName: z.string(),
  employerEmail: z.email(),
  employerPhone: z.string().nullable(),
  previousPosition: z.string(),
  startDate: z.date(),
  endDate: z.date().nullable(),
  reasonForLeaving: z.string(),
  resumeUrl: z.string().nullable(),
});
