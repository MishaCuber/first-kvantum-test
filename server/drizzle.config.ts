import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: './src/database/schema/*.ts',
  out: './database/migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT || '3306'),
    user: process.env.USERNAME || 'root',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || 'mortgage_calculator',
  },
  verbose: true,
  strict: true,
});