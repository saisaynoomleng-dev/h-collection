import { createEnv } from '@t3-oss/env-nextjs';
import z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    SANITY_STUDIO__PROJECT_ID: z.string(),
    SANITY_STUDIO_DATASET: z.string(),
    SANITY_READ_TOKEN: z.string(),
    SANITY_WRITE_TOKEN: z.string(),
    DATABASE_URL: z.string(),
    SANITY_WEBHOOK_SECRET: z.string(),
    RESEND_API_KEY: z.string(),
    SANITY_WEBHOOK_GIFTCARD_SECRET: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_GIFTCARD_WEBHOOK_SECRET: z.string(),
  },
  experimental__runtimeEnv: process.env,
});
