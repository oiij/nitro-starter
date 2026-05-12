CREATE TABLE "test" (
	"id" serial NOT NULL,
	"uuid" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
