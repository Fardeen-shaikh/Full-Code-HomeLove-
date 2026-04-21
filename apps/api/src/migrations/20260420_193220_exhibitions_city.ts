import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "exhibitions_programs" DROP CONSTRAINT "exhibitions_programs_cta_page_id_hidden_pages_id_fk";
  
  DROP INDEX "exhibitions_programs_cta_page_idx";
  ALTER TABLE "exhibitions" ADD COLUMN "city" varchar;
  ALTER TABLE "exhibitions_programs" DROP COLUMN "cta_label";
  ALTER TABLE "exhibitions_programs" DROP COLUMN "cta_page_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "exhibitions_programs" ADD COLUMN "cta_label" varchar;
  ALTER TABLE "exhibitions_programs" ADD COLUMN "cta_page_id" integer;
  ALTER TABLE "exhibitions_programs" ADD CONSTRAINT "exhibitions_programs_cta_page_id_hidden_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."hidden_pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "exhibitions_programs_cta_page_idx" ON "exhibitions_programs" USING btree ("cta_page_id");
  ALTER TABLE "exhibitions" DROP COLUMN "city";`)
}
