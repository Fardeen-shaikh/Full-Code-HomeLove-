import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_chat_conversations_topic" AS ENUM('general', 'exhibition', 'exhibitor', 'home-tips', 'checklist', 'other');
  CREATE TABLE "chat_conversations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"session_id" varchar NOT NULL,
  	"messages" jsonb NOT NULL,
  	"lead_name" varchar,
  	"lead_email" varchar,
  	"lead_phone" varchar,
  	"lead_captured" boolean DEFAULT false,
  	"topic" "enum_chat_conversations_topic",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "chat_conversations_id" integer;
  CREATE INDEX "chat_conversations_updated_at_idx" ON "chat_conversations" USING btree ("updated_at");
  CREATE INDEX "chat_conversations_created_at_idx" ON "chat_conversations" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_chat_conversations_fk" FOREIGN KEY ("chat_conversations_id") REFERENCES "public"."chat_conversations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_chat_conversations_id_idx" ON "payload_locked_documents_rels" USING btree ("chat_conversations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "chat_conversations" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "chat_conversations" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_chat_conversations_fk";
  
  DROP INDEX "payload_locked_documents_rels_chat_conversations_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "chat_conversations_id";
  DROP TYPE "public"."enum_chat_conversations_topic";`)
}
