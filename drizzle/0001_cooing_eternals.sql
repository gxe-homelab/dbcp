CREATE TABLE IF NOT EXISTS "database" (
	"id" "serial" PRIMARY KEY NOT NULL,
	"name" varchar(35) NOT NULL,
	"user_id" int,
	CONSTRAINT "database_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "database" ADD CONSTRAINT "database_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
