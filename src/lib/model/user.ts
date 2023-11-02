import sql from '$lib/pg.server';

export interface PgUser {
	oid: number;
	rolname: string;
	rolsuper: boolean;
	rolcreaterole: boolean;
	rolcreatedb: boolean;
	rolcanlogin: boolean;
	rolreplication: boolean;
	rolconnlimit: number;
	rolvaliduntil: unknown;
}

export interface PgCreateUser {
	name: string;
	sudo?: boolean;
	createDb?: boolean;
	createRole?: boolean;
	login?: boolean;
	connLimit?: number;
	password: string;
}

export interface PgUpdateUser {
	name: string;
	newName?: string;
	createDb?: boolean;
	createRole?: boolean;
	password?: string;
}

export const createUser = async (user: PgCreateUser) => {
	const SUDO = user.sudo ? 'SUPERUSER' : 'NOSUPERUSER';
	const CREATEDB = user.createDb ? 'CREATEDB' : 'NOCREATEDB';
	const CREATEROLE = user.createRole ? 'CREATEROLE' : 'NOCREATEROLE';
	const LOGIN = user.login ? 'LOGIN' : 'NOLOGIN';
	const CONNLIMIT = 'CONNECTION LIMIT ' + (user.connLimit ? user.connLimit.toString() : '-1');
	const PASSWORD = "PASSWORD '" + user.password + "'";

	return sql.unsafe(
		`CREATE ROLE ${user.name} WITH ${SUDO} ${CREATEDB} ${CREATEROLE} INHERIT ${LOGIN} NOREPLICATION ${CONNLIMIT} ${PASSWORD};`
	);
};

export const getAllUsers = async () =>
	sql<PgUser[]>`
		SELECT oid, rolname, rolsuper,  rolcreaterole, rolcreatedb, rolcanlogin, rolreplication, rolconnlimit, rolvaliduntil 
		FROM pg_catalog.pg_authid;
	`;

export const getUser = async (username: string) =>
	sql<PgUser[]>`
		SELECT oid, rolname, rolsuper,  rolcreaterole, rolcreatedb, rolcanlogin, rolreplication, rolconnlimit, rolvaliduntil 
		FROM pg_catalog.pg_authid 
		WHERE rolname=${username};
	`;

export const updateUser = async (user: PgUpdateUser) => {
	return sql.begin((tx) => {
		const { createDb, createRole, name, newName, password } = user;

		if (createDb !== undefined || createRole !== undefined || password !== undefined) {
			const CREATEDB = createDb !== undefined ? (createDb ? 'CREATEDB' : 'NOCREATEDB') : '';
			const CREATEROLE =
				createRole !== undefined ? (createRole ? 'CREATEROLE' : 'NOCREATEROLE') : '';
			const PASSWORD = password !== undefined ? "WITH PASSWORD '" + password + "'" : '';

			tx`ALTER USER ${name} WITH ${CREATEDB} ${CREATEROLE} ${PASSWORD}`;
		}

		if (newName) tx`ALTER USER ${name} RENAME TO ${newName}`;

		return tx<PgUser[]>`
			SELECT oid, rolname, rolsuper,  rolcreaterole, rolcreatedb, rolcanlogin, rolreplication, rolconnlimit, rolvaliduntil 
			FROM pg_catalog.pg_authid 
			WHERE rolname=${newName ? newName : name};
		`;
	});
};

export const deleteUser = async (username: string) =>
	sql.unsafe(`DROP ROLE IF EXISTS ${username};`);
