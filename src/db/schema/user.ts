import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
	id: serial('id').primaryKey(),
	username: varchar('username', { length: 35 }).notNull().unique(),
	password: varchar('password', { length: 35 }).notNull()
});
