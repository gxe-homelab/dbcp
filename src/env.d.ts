/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly DEV_DATABASE_URL: string;
	readonly PROD_DATABASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
