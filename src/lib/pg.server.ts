import postgres from 'postgres';
import { DB_PASSWORD, DB_DATABASE, DB_USERNAME, DB_HOSTNAME } from '$env/static/private';
import { dev } from '$app/environment';
import prexit from 'prexit';

const sql = postgres({
	username: dev ? 'postgres' : DB_USERNAME,
	password: dev ? 'postgres' : DB_PASSWORD,
	hostname: dev ? 'localhost' : DB_HOSTNAME,
	port: 5432,
	database: dev ? 'postgres' : DB_DATABASE,

	connection: {
		application_name: 'main | dbcp'
	},

	debug: dev
});

prexit(async () => {
	await sql.end({ timeout: 5 });
});

export default sql;
