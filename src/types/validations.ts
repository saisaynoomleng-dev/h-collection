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
