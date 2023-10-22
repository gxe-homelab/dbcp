import type { Config } from 'drizzle-kit';
import 'dotenv/config';

const DEV = process.env.NODE_ENV! == 'developement';
const DATABASE_URL = process.env[DEV ? 'DEV' : 'PROD' + '_DATABASE_URL']!;

export default {
	schema: './src/db/schema/*',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString: DATABASE_URL
	},
	verbose: true,
	strict: !DEV
} satisfies Config;
