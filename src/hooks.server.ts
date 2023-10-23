import { JWT_COOKIE_KEY, verify } from '$lib/jwt.server';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies, url, locals } = event;

	const token = cookies.get(JWT_COOKIE_KEY) ?? '';
	const user = verify(token);

	if (url.pathname !== '/login' && !user) {
		cookies.delete(JWT_COOKIE_KEY);
		locals.user = undefined;

		throw redirect(302, 'login');
	}

	if (!locals.user && typeof user == 'object') {
		locals.user = user;
	}

	return resolve(event);
};
