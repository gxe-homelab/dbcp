import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const admins = pgTable('admin', {
	id: serial('id').primaryKey(),
	username: varchar('username', { length: 35 }).notNull().unique(),
	password: varchar('password', { length: 60 }).notNull()
});
