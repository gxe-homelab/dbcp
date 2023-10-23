import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { users } from './schema/user';
import { databases } from './schema/database';
import { building, dev } from '$app/environment';
import { DEV_DATABASE_URL, PROD_DATABASE_URL } from '$env/static/private';
import { admins } from './schema/admins';

const DATABASE_URL = dev ? DEV_DATABASE_URL : PROD_DATABASE_URL;

const pool = new Pool({
	connectionString: DATABASE_URL,
	max: 2
});

try {
	if (building) {
		const migrationDb = drizzle(pool, {
			schema: {
				users,
				databases,
				admins
			}
		});

		await migrate(migrationDb, { migrationsFolder: 'drizzle' });
	}
} catch (error) {
	console.log(error);
}

// for query purposes
export const db = drizzle(pool, {
	schema: {
		users,
		databases,
		admins
	}
});
