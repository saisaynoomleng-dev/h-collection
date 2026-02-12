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
