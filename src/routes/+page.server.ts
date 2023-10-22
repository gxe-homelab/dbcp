import { db } from '../db/index';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { users } from '../db/schema/user';
import { databases } from '../db/schema/database';

export const load = (async () => {
	return {
		databases: db.query.databases.findMany(),
		users: db.query.users.findMany()
	};
}) satisfies PageServerLoad;

export const actions = {
	user: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username') as string;
		const password = data.get('password') as string;

		if (!username) {
			return fail(400, { username, missing: true });
		}

		if (!password) {
			return fail(400, { password, missing: true });
		}

		const res = await db
			.insert(users)
			.values({
				password,
				username
			})
			.returning();

		return {
			succes: true,
			...res[0]
		};
	},

	database: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('name') as string;
		const user = data.get('user') as string;

		if (!name) {
			return fail(400, { name, missing: true });
		}

		if (!user) {
			return fail(400, { user, missing: true });
		}

		const res = await db
			.insert(databases)
			.values({
				name,
				userId: parseInt(user)
			})
			.returning();

		return {
			succes: true,
			...res[0]
		};
	}
} satisfies Actions;
