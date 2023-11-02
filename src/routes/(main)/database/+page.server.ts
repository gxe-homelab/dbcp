import { createDatabase, getAllDatabases } from '$lib/model/database';
import { getAllUsers } from '$lib/model/user';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {
		databases: getAllDatabases(),
		users: getAllUsers()
	};
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name')! as string;
		const owner = data.get('owner')! as string;
		const allowconn = data.get('allowconn') !== undefined;
		const connlimit = parseInt(<string>(data.get('connlimit') ?? '-1'));

		let res;
		try {
			res = await createDatabase({
				name,
				owner,
				allowConn: allowconn,
				connLimit: connlimit
			});
		} catch (err) {
			return fail(400, {
				msg: err instanceof Error ? err.message : String(err)
			});
		}

		return {
			succes: true,
			data: res[0]
		};
	}
} satisfies Actions;
