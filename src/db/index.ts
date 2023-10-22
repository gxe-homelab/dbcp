import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { users } from './schema/user';
import { databases } from './schema/database';
import { building, dev } from '$app/environment';
import { DEV_DATABASE_URL, PROD_DATABASE_URL } from '$env/static/private';

const DATABASE_URL = dev ? DEV_DATABASE_URL : PROD_DATABASE_URL;

if (building) {
	const migrationClient = postgres(DATABASE_URL, { max: 1 });
	const migrationDb = drizzle(migrationClient);

	await migrate(migrationDb, { migrationsFolder: 'drizzle' });
}

// for query purposes
const queryClient = postgres(DATABASE_URL);
export const db = drizzle(queryClient, {
	schema: {
		users,
		databases
	}
});
