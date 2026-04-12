import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "exhibitions_programs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "exhibitions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"featured_brands_id" integer
  );
  
  ALTER TABLE "featured_brands" DROP CONSTRAINT "featured_brands_exhibition_id_exhibitions_id_fk";
  
  DROP INDEX "featured_brands_exhibition_idx";
  ALTER TABLE "featured_brands" ADD COLUMN "website" varchar;
  ALTER TABLE "exhibitions_programs" ADD CONSTRAINT "exhibitions_programs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "exhibitions_programs" ADD CONSTRAINT "exhibitions_programs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."exhibitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "exhibitions_rels" ADD CONSTRAINT "exhibitions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."exhibitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "exhibitions_rels" ADD CONSTRAINT "exhibitions_rels_featured_brands_fk" FOREIGN KEY ("featured_brands_id") REFERENCES "public"."featured_brands"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "exhibitions_programs_order_idx" ON "exhibitions_programs" USING btree ("_order");
  CREATE INDEX "exhibitions_programs_parent_id_idx" ON "exhibitions_programs" USING btree ("_parent_id");
  CREATE INDEX "exhibitions_programs_image_idx" ON "exhibitions_programs" USING btree ("image_id");
  CREATE INDEX "exhibitions_rels_order_idx" ON "exhibitions_rels" USING btree ("order");
  CREATE INDEX "exhibitions_rels_parent_idx" ON "exhibitions_rels" USING btree ("parent_id");
  CREATE INDEX "exhibitions_rels_path_idx" ON "exhibitions_rels" USING btree ("path");
  CREATE INDEX "exhibitions_rels_featured_brands_id_idx" ON "exhibitions_rels" USING btree ("featured_brands_id");
  ALTER TABLE "featured_brands" DROP COLUMN "exhibition_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "exhibitions_programs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "exhibitions_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "exhibitions_programs" CASCADE;
  DROP TABLE "exhibitions_rels" CASCADE;
  ALTER TABLE "featured_brands" ADD COLUMN "exhibition_id" integer;
  ALTER TABLE "featured_brands" ADD CONSTRAINT "featured_brands_exhibition_id_exhibitions_id_fk" FOREIGN KEY ("exhibition_id") REFERENCES "public"."exhibitions"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "featured_brands_exhibition_idx" ON "featured_brands" USING btree ("exhibition_id");
  ALTER TABLE "featured_brands" DROP COLUMN "website";`)
}
