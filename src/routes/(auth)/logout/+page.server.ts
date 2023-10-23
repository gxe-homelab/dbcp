import { JWT_COOKIE_KEY } from '$lib/jwt.server';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ locals, cookies }) => {
		cookies.delete(JWT_COOKIE_KEY);
		locals.user = undefined;

		throw redirect(303, 'login');
	}
} satisfies Actions;
