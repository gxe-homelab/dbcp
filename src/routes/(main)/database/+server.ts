import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteDatabase } from '$lib/model/database';

export const DELETE: RequestHandler = async ({ url }) => {
	const name = url.searchParams.get('name');

	if (!name) {
		throw error(400);
	}

	const res = await deleteDatabase(name);

	console.log(res);

	return new Response('ok');
};
