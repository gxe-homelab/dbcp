CREATE TABLE IF NOT EXISTS "user" (
	"id" "serial" PRIMARY KEY NOT NULL,
	"username" varchar(35) NOT NULL,
	"password" varchar(35) NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
