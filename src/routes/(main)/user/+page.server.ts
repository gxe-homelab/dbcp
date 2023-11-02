import { createUser, getAllUsers } from '$lib/model/user';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {
		users: getAllUsers()
	};
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();

		console.log(data);

		const name = data.get('name')! as string;
		const sudo = data.get('sudo') !== null;
		const createDb = data.get('createdb') !== null;
		const createRole = data.get('createrole') !== null;
		const login = data.get('login') !== null;
		const connLimit = parseInt(data.get('connlimit')! as string);
		const password = data.get('password')! as string;

		console.log(sudo, createDb, createRole, login, connLimit);

		try {
			await createUser({
				name,
				password,
				connLimit,
				createDb,
				createRole,
				login,
				sudo
			});
		} catch (err) {
			return fail(400, {
				msg: err instanceof Error ? err.message : String(err)
			});
		}

		return {
			success: true,
			revalidate: 'users'
		};
	}
} satisfies Actions;
