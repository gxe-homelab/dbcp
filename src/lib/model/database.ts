import sql from '$lib/pg.server';

export interface PgDatabase {
	oid: number;
	/** Represents the database name */
	datname: string;
	/** Database owner */
	datdba: number;
	encoding: number;
	datistemplate: boolean;
	datallowconn: boolean;
	datconnlimit: number;
}

export interface PgCreateDatabase {
	name: string;
	owner: string;
	allowConn?: boolean;
	connLimit?: number;
}

export interface PgUpdateDatabase {
	name: string;
	newName?: string;
	newOwner?: string;
	allowconn?: boolean;
	connlimit?: number;
}

export const createDatabase = async (db: PgCreateDatabase) => {
	const ALLOWCONN = db.allowConn !== undefined ? `ALLOW_CONNECTIONS ${db.allowConn}` : '';
	const CONNLIMIT = db.connLimit ? `CONNECTION LIMIT ${db.connLimit}` : '';

	return sql.unsafe(`CREATE DATABASE ${db.name} WITH OWNER ${db.owner} ${ALLOWCONN} ${CONNLIMIT};`);
};

export const getAllDatabases = async () =>
	sql<PgDatabase[]>`
		SELECT oid, datname, datdba, pg_encoding_to_char(encoding), datistemplate, datallowconn, datconnlimit 
		FROM pg_catalog.pg_database;
	`;

export const getDatabase = async (dbname: string) =>
	sql<PgDatabase[]>`
		SELECT oid, datname, datdba, pg_encoding_to_char(encoding), datistemplate, datallowconn, datconnlimit 
		FROM pg_catalog.pg_database 
		WHERE datname=${dbname}
	`;

export const updateUser = async (db: PgUpdateDatabase) => {
	return sql.begin((tx) => {
		const { name, allowconn, connlimit, newName, newOwner } = db;

		if (allowconn !== undefined || connlimit !== undefined) {
			const ALLOWCONN = allowconn !== undefined ? `ALLOW_CONNECTIONS ${allowconn}` : '';
			const CONNLIMIT = connlimit !== undefined ? `CONNECTION LIMIT ${connlimit}` : '';

			tx`ALTER DATABASE ${name} WITH ${ALLOWCONN} ${CONNLIMIT};`;
		}

		if (newOwner) tx`ALTER DATABASE ${name} OWNER TO ${newOwner}`;

		if (newName) tx`ALTER DATABASE ${name} RENAME TO ${newName}`;

		return tx<PgDatabase[]>`
			SELECT oid, datname, datdba, pg_encoding_to_char(encoding), datistemplate, datallowconn, datconnlimit 
			FROM pg_catalog.pg_database 
			WHERE datname=${newName ? newName : name}
		`;
	});
};
