import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { env } from '@/lib/env/server';

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql, { schema, logger: true });

export default db;
