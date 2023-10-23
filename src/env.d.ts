/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly DEV_DATABASE_URL: string;

	readonly PROD_DATABASE_URL: string;

	readonly JWT_SALT: string;
	readonly JWT_SECRET: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
