import { pgTable, serial, smallint, varchar } from 'drizzle-orm/pg-core';
import { users } from './user';

export const databases = pgTable('database', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 35 }).notNull().unique(),
	userId: smallint('user_id').references(() => users.id)
});
