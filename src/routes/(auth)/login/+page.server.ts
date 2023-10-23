import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$db';
import { admins } from '$db/schema/admins';
import { compare } from 'bcrypt';
import { JWT_COOKIE_KEY, sign, verify } from '$lib/jwt.server';
import { base } from '$app/paths';
import { eq } from 'drizzle-orm';

export const actions = {
	default: async ({ request, cookies, locals }) => {
		const data = await request.formData();

		const username = data.get('username') as string;
		const password = data.get('password') as string;

		if (!username) {
			return fail(400, { username: true, missing: true });
		}

		if (!password) {
			return fail(400, { password: true, missing: true });
		}

		const admin = await db.select().from(admins).where(eq(admins.username, username));

		console.log(admin);

		if (admin.length == 0) {
			return fail(404, { username, notfound: true });
		}

		if (!(await compare(password, admin[0].password))) {
			return fail(400, { password, wrong: true });
		}

		const token = sign(admin[0].id, username);
		const user = verify(token);

		if (typeof user === 'boolean') return;

		locals.user = user;

		cookies.set(JWT_COOKIE_KEY, token, {
			httpOnly: true,
			domain: base,
			secure: true,
			sameSite: true
		});

		throw redirect(303, '/');
	}
} satisfies Actions;
