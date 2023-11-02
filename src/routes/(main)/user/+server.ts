import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteUser } from '$lib/model/user';

export const DELETE: RequestHandler = async ({ url }) => {
	const name = url.searchParams.get('name');

	if (!name) {
		throw error(400);
	}

	try {
		await deleteUser(name);
	} catch (err) {
		throw error(400, {
			message: err instanceof Error ? err.message : String(err)
		});
	}

	return new Response('ok');
};
