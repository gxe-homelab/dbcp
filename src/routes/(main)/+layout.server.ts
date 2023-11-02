import { getAllDatabases } from '$lib/model/database';
import { getAllUsers } from '$lib/model/user';
import type { IThroughput } from '../(api)/api/monitoring/throughput/+server';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	return {
		users: getAllUsers(),
		databases: getAllDatabases(),
		throughput: <Promise<IThroughput>>(await fetch('/api/monitoring/throughput')).json()
	};
}) satisfies LayoutServerLoad;
