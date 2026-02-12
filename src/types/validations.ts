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
