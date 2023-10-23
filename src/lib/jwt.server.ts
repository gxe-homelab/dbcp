import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_SALT } from '$env/static/private';

interface JwtPayload {
	time: number;
	id: number;
	username: string;
	salt: string;
}

export const JWT_COOKIE_KEY = 'jwt_token';

export function sign(id: number, username: string): string {
	const payload: JwtPayload = {
		time: Date.now(),
		id,
		username,
		salt: JWT_SALT
	};

	return jwt.sign(payload, JWT_SECRET, {
		algorithm: 'HS512',
		expiresIn: '30min'
	});
}

interface IVerifyResult {
	id: number;
	username: string;
	exp: number;
}

interface IJwtVerifyPayload {
	time: number;
	id: number;
	username: string;
	salt: string;
	iat: number;
	exp: number;
}

export function verify(token: string): IVerifyResult | boolean {
	try {
		const res = <IJwtVerifyPayload>jwt.verify(token, JWT_SECRET);

		return {
			id: res.id,
			username: res.username,
			exp: res.exp
		};
	} catch (error) {
		return false;
	}
}
