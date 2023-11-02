import { dev } from '$app/environment';
import { DB_HOSTNAME, DB_PASSWORD, DB_USERNAME } from '$env/static/private';
import postgres from 'postgres';
import prexit from 'prexit';

type Options = postgres.Options<Record<string, never>>;

const defaultPgDatabaseClientOptions: Options = {
	username: DB_USERNAME,
	password: DB_PASSWORD,
	hostname: DB_HOSTNAME,
	port: 5432
};

export async function pgDatabaseClient(name: string, options?: Options) {
	const sql = postgres({
		...defaultPgDatabaseClientOptions,
		...options,
		connection: {
			application_name: name + ' | dbcp'
		},

		database: name,

		debug: dev
	});

	prexit(async () => {
		await sql.end({ timeout: 5 });
	});

	return {
		getDatabaseSize() {
			return sql`SELECT pg_size_pretty(pg_database_size(${name}));`;
		},
		getDatabaseTables() {
			return sql`SELECT is_insertable_into, table_catalog, table_name FROM information_schema.tables WHERE table_schema='public';`;
		},
		getDatabaseThroughput() {
			return sql`SELECT datid, datname, tup_fetched, tup_returned FROM pg_stat_database`;
		}
	};
}
