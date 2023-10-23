import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { users } from './user';

export const databases = pgTable('database', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 35 }).notNull().unique(),
	userId: integer('user_id').references(() => users.id)
});
