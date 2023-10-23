CREATE TABLE IF NOT EXISTS "admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(35) NOT NULL,
	"password" varchar(60) NOT NULL,
	CONSTRAINT "admin_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "database" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(35) NOT NULL,
	"user_id" integer,
	CONSTRAINT "database_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(35) NOT NULL,
	"password" varchar(60) NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "database" ADD CONSTRAINT "database_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
