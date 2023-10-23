import { db } from '$db';
import { users } from '$db/schema/user';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		users: db.select().from(users)
	};
}) satisfies PageServerLoad;
