import type { Config } from 'drizzle-kit';
import 'dotenv/config';

const DEV = process.env.NODE_ENV! == 'development';
const DATABASE_URL = !DEV ? process.env.PROD_DATABASE_URL! : process.env.DEV_DATABASE_URL!;

export default {
	schema: './src/db/schema/*',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString: DATABASE_URL
	},
	verbose: true,
	strict: true
} satisfies Config;
