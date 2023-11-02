import sql from '$lib/pg.server';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export interface PgThroughputPayload {
	fetched: number;
	returned: number;
}

export interface IThroughput {
	returned: number;
	fetched: number;
	timestamp: number;
}

export const GET: RequestHandler = async ({ url }) => {
	let data: IThroughput;

	try {
		const [throughput] = await sql<
			PgThroughputPayload[]
		>`SELECT SUM(tup_fetched) as fetched, SUM(tup_returned) as returned FROM pg_stat_database`;

		data = {
			fetched: Number(throughput.fetched),
			returned: Number(throughput.returned),
			timestamp: Date.now()
		};
	} catch (err) {
		throw error(400, { message: String(err) });
	}

	return json(data);
};
