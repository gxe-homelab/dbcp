import { getDatabase } from '$lib/model/database';
import { pgDatabaseClient } from '$lib/model/databaseinfo';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const clients: Record<string, Awaited<ReturnType<typeof pgDatabaseClient>>> = {};

export const load = (async ({ params }) => {
	let client;

	try {
		client = clients[params.name] ?? (await pgDatabaseClient(params.name));

		if (!clients[params.name]) clients[params.name] = client;
	} catch (err) {
		throw error(400, String(err));
	}

	return {
		database: (await getDatabase(params.name))[0],
		tables: client.getDatabaseTables(),
		size: client.getDatabaseSize(),
		throughput: client.getDatabaseThroughput()
	};
}) satisfies PageServerLoad;
