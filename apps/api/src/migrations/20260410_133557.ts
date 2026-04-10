import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_exhibitions_state" AS ENUM('Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu');
  CREATE TYPE "public"."enum_blog_posts_category" AS ENUM('home-tips', 'trends-ideas', 'buying-guide', 'renovation', 'interior-design', 'smart-home');
  CREATE TYPE "public"."enum_blog_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_posts_v_version_category" AS ENUM('home-tips', 'trends-ideas', 'buying-guide', 'renovation', 'interior-design', 'smart-home');
  CREATE TYPE "public"."enum__blog_posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_checklist_profiles_profile_slug" AS ENUM('first-home', 'home-renovation', 'rental-airbnb');
  CREATE TYPE "public"."enum_subscribers_state" AS ENUM('Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu');
  CREATE TYPE "public"."enum_subscribers_source" AS ENUM('newsletter', 'event', 'contact', 'exhibitor');
  CREATE TYPE "public"."enum_hidden_pages_type" AS ENUM('tnc', 'contest', 'crazy-deals', 'share-win', 'other');
  CREATE TYPE "public"."enum_user_sessions_checklist_profile" AS ENUM('first-home', 'home-renovation', 'rental-airbnb');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"content" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_content" jsonb,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "exhibitions_program_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "exhibitions_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "exhibitions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" jsonb,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"venue" varchar NOT NULL,
  	"state" "enum_exhibitions_state" NOT NULL,
  	"banner_image_id" integer NOT NULL,
  	"vertical_video_id" integer,
  	"floorplan_image_id" integer,
  	"brand_count" numeric,
  	"is_upcoming" boolean DEFAULT true,
  	"countdown_enabled" boolean DEFAULT true,
  	"map_link" varchar,
  	"tnc_page_id" integer,
  	"contest_enabled" boolean DEFAULT false,
  	"contest_title" varchar,
  	"contest_description" varchar,
  	"contest_image_id" integer,
  	"contest_form_fields" jsonb,
  	"share_and_win_enabled" boolean DEFAULT false,
  	"share_and_win_title" varchar,
  	"share_and_win_description" varchar,
  	"share_and_win_hidden_page_id" integer,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "crazy_deals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"exhibition_id" integer NOT NULL,
  	"description" varchar,
  	"image_id" integer NOT NULL,
  	"original_price" numeric,
  	"deal_price" numeric,
  	"brand" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "discount_coupons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"exhibition_id" integer NOT NULL,
  	"description" varchar,
  	"image_id" integer,
  	"code" varchar,
  	"valid_until" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"featured_image_id" integer,
  	"category" "enum_blog_posts_category",
  	"author" varchar,
  	"published_at" timestamp(3) with time zone,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_blog_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_blog_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_featured_image_id" integer,
  	"version_category" "enum__blog_posts_v_version_category",
  	"version_author" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__blog_posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "featured_brands" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"exhibition_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "checklist_profiles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"profile_slug" "enum_checklist_profiles_profile_slug" NOT NULL,
  	"description" varchar NOT NULL,
  	"top_priorities" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "checklist_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"order" numeric DEFAULT 0
  );
  
  CREATE TABLE "checklist_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"profile_id" integer NOT NULL,
  	"room" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"state" "enum_subscribers_state" NOT NULL,
  	"source" "enum_subscribers_source" DEFAULT 'newsletter' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"message" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "exhibitor_inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"exhibit_venue" varchar NOT NULL,
  	"company_name" varchar NOT NULL,
  	"product_service" varchar NOT NULL,
  	"additional_info" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "hidden_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"type" "enum_hidden_pages_type" NOT NULL,
  	"exhibition_id" integer,
  	"is_published" boolean DEFAULT false,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "promotional_popups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb,
  	"image_id" integer,
  	"cta_text" varchar,
  	"cta_link" varchar,
  	"is_active" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "user_sessions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"session_id" varchar NOT NULL,
  	"favourites" jsonb,
  	"checklist_selections" jsonb,
  	"checklist_profile" "enum_user_sessions_checklist_profile",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"exhibitions_id" integer,
  	"crazy_deals_id" integer,
  	"discount_coupons_id" integer,
  	"blog_posts_id" integer,
  	"featured_brands_id" integer,
  	"checklist_profiles_id" integer,
  	"checklist_categories_id" integer,
  	"subscribers_id" integer,
  	"contact_inquiries_id" integer,
  	"exhibitor_inquiries_id" integer,
  	"hidden_pages_id" integer,
  	"promotional_popups_id" integer,
  	"user_sessions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "exhibitions_program_schedule" ADD CONSTRAINT "exhibitions_program_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."exhibitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "exhibitions_faq" ADD CONSTRAINT "exhibitions_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."exhibitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "exhibitions" ADD CONSTRAINT "exhibitions_banner_image_id_media_id_fk" FOREIGN KEY ("banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "exhibitions" ADD CONSTRAINT "exhibitions_vertical_video_id_media_id_fk" FOREIGN KEY ("vertical_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "exhibitions" ADD CONSTRAINT "exhibitions_floorplan_image_id_media_id_fk" FOREIGN KEY ("floorplan_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "exhibitions" ADD CONSTRAINT "exhibitions_tnc_page_id_hidden_pages_id_fk" FOREIGN KEY ("tnc_page_id") REFERENCES "public"."hidden_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "exhibitions" ADD CONSTRAINT "exhibitions_contest_image_id_media_id_fk" FOREIGN KEY ("contest_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "exhibitions" ADD CONSTRAINT "exhibitions_share_and_win_hidden_page_id_hidden_pages_id_fk" FOREIGN KEY ("share_and_win_hidden_page_id") REFERENCES "public"."hidden_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "exhibitions" ADD CONSTRAINT "exhibitions_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "crazy_deals" ADD CONSTRAINT "crazy_deals_exhibition_id_exhibitions_id_fk" FOREIGN KEY ("exhibition_id") REFERENCES "public"."exhibitions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "crazy_deals" ADD CONSTRAINT "crazy_deals_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "discount_coupons" ADD CONSTRAINT "discount_coupons_exhibition_id_exhibitions_id_fk" FOREIGN KEY ("exhibition_id") REFERENCES "public"."exhibitions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "discount_coupons" ADD CONSTRAINT "discount_coupons_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_parent_id_blog_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "featured_brands" ADD CONSTRAINT "featured_brands_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "featured_brands" ADD CONSTRAINT "featured_brands_exhibition_id_exhibitions_id_fk" FOREIGN KEY ("exhibition_id") REFERENCES "public"."exhibitions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "checklist_categories_items" ADD CONSTRAINT "checklist_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."checklist_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "checklist_categories" ADD CONSTRAINT "checklist_categories_profile_id_checklist_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."checklist_profiles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hidden_pages" ADD CONSTRAINT "hidden_pages_exhibition_id_exhibitions_id_fk" FOREIGN KEY ("exhibition_id") REFERENCES "public"."exhibitions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "promotional_popups" ADD CONSTRAINT "promotional_popups_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_exhibitions_fk" FOREIGN KEY ("exhibitions_id") REFERENCES "public"."exhibitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_crazy_deals_fk" FOREIGN KEY ("crazy_deals_id") REFERENCES "public"."crazy_deals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_discount_coupons_fk" FOREIGN KEY ("discount_coupons_id") REFERENCES "public"."discount_coupons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_featured_brands_fk" FOREIGN KEY ("featured_brands_id") REFERENCES "public"."featured_brands"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_checklist_profiles_fk" FOREIGN KEY ("checklist_profiles_id") REFERENCES "public"."checklist_profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_checklist_categories_fk" FOREIGN KEY ("checklist_categories_id") REFERENCES "public"."checklist_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subscribers_fk" FOREIGN KEY ("subscribers_id") REFERENCES "public"."subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_inquiries_fk" FOREIGN KEY ("contact_inquiries_id") REFERENCES "public"."contact_inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_exhibitor_inquiries_fk" FOREIGN KEY ("exhibitor_inquiries_id") REFERENCES "public"."exhibitor_inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hidden_pages_fk" FOREIGN KEY ("hidden_pages_id") REFERENCES "public"."hidden_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_promotional_popups_fk" FOREIGN KEY ("promotional_popups_id") REFERENCES "public"."promotional_popups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_user_sessions_fk" FOREIGN KEY ("user_sessions_id") REFERENCES "public"."user_sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "exhibitions_program_schedule_order_idx" ON "exhibitions_program_schedule" USING btree ("_order");
  CREATE INDEX "exhibitions_program_schedule_parent_id_idx" ON "exhibitions_program_schedule" USING btree ("_parent_id");
  CREATE INDEX "exhibitions_faq_order_idx" ON "exhibitions_faq" USING btree ("_order");
  CREATE INDEX "exhibitions_faq_parent_id_idx" ON "exhibitions_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "exhibitions_slug_idx" ON "exhibitions" USING btree ("slug");
  CREATE INDEX "exhibitions_banner_image_idx" ON "exhibitions" USING btree ("banner_image_id");
  CREATE INDEX "exhibitions_vertical_video_idx" ON "exhibitions" USING btree ("vertical_video_id");
  CREATE INDEX "exhibitions_floorplan_image_idx" ON "exhibitions" USING btree ("floorplan_image_id");
  CREATE INDEX "exhibitions_tnc_page_idx" ON "exhibitions" USING btree ("tnc_page_id");
  CREATE INDEX "exhibitions_contest_contest_image_idx" ON "exhibitions" USING btree ("contest_image_id");
  CREATE INDEX "exhibitions_share_and_win_share_and_win_hidden_page_idx" ON "exhibitions" USING btree ("share_and_win_hidden_page_id");
  CREATE INDEX "exhibitions_seo_seo_og_image_idx" ON "exhibitions" USING btree ("seo_og_image_id");
  CREATE INDEX "exhibitions_updated_at_idx" ON "exhibitions" USING btree ("updated_at");
  CREATE INDEX "exhibitions_created_at_idx" ON "exhibitions" USING btree ("created_at");
  CREATE INDEX "crazy_deals_exhibition_idx" ON "crazy_deals" USING btree ("exhibition_id");
  CREATE INDEX "crazy_deals_image_idx" ON "crazy_deals" USING btree ("image_id");
  CREATE INDEX "crazy_deals_updated_at_idx" ON "crazy_deals" USING btree ("updated_at");
  CREATE INDEX "crazy_deals_created_at_idx" ON "crazy_deals" USING btree ("created_at");
  CREATE INDEX "discount_coupons_exhibition_idx" ON "discount_coupons" USING btree ("exhibition_id");
  CREATE INDEX "discount_coupons_image_idx" ON "discount_coupons" USING btree ("image_id");
  CREATE INDEX "discount_coupons_updated_at_idx" ON "discount_coupons" USING btree ("updated_at");
  CREATE INDEX "discount_coupons_created_at_idx" ON "discount_coupons" USING btree ("created_at");
  CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");
  CREATE INDEX "blog_posts_featured_image_idx" ON "blog_posts" USING btree ("featured_image_id");
  CREATE INDEX "blog_posts_seo_seo_og_image_idx" ON "blog_posts" USING btree ("seo_og_image_id");
  CREATE INDEX "blog_posts_updated_at_idx" ON "blog_posts" USING btree ("updated_at");
  CREATE INDEX "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");
  CREATE INDEX "blog_posts__status_idx" ON "blog_posts" USING btree ("_status");
  CREATE INDEX "_blog_posts_v_parent_idx" ON "_blog_posts_v" USING btree ("parent_id");
  CREATE INDEX "_blog_posts_v_version_version_slug_idx" ON "_blog_posts_v" USING btree ("version_slug");
  CREATE INDEX "_blog_posts_v_version_version_featured_image_idx" ON "_blog_posts_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_blog_posts_v_version_seo_version_seo_og_image_idx" ON "_blog_posts_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_blog_posts_v_version_version_updated_at_idx" ON "_blog_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_blog_posts_v_version_version_created_at_idx" ON "_blog_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_blog_posts_v_version_version__status_idx" ON "_blog_posts_v" USING btree ("version__status");
  CREATE INDEX "_blog_posts_v_created_at_idx" ON "_blog_posts_v" USING btree ("created_at");
  CREATE INDEX "_blog_posts_v_updated_at_idx" ON "_blog_posts_v" USING btree ("updated_at");
  CREATE INDEX "_blog_posts_v_latest_idx" ON "_blog_posts_v" USING btree ("latest");
  CREATE INDEX "featured_brands_logo_idx" ON "featured_brands" USING btree ("logo_id");
  CREATE INDEX "featured_brands_exhibition_idx" ON "featured_brands" USING btree ("exhibition_id");
  CREATE INDEX "featured_brands_updated_at_idx" ON "featured_brands" USING btree ("updated_at");
  CREATE INDEX "featured_brands_created_at_idx" ON "featured_brands" USING btree ("created_at");
  CREATE INDEX "checklist_profiles_updated_at_idx" ON "checklist_profiles" USING btree ("updated_at");
  CREATE INDEX "checklist_profiles_created_at_idx" ON "checklist_profiles" USING btree ("created_at");
  CREATE INDEX "checklist_categories_items_order_idx" ON "checklist_categories_items" USING btree ("_order");
  CREATE INDEX "checklist_categories_items_parent_id_idx" ON "checklist_categories_items" USING btree ("_parent_id");
  CREATE INDEX "checklist_categories_profile_idx" ON "checklist_categories" USING btree ("profile_id");
  CREATE INDEX "checklist_categories_updated_at_idx" ON "checklist_categories" USING btree ("updated_at");
  CREATE INDEX "checklist_categories_created_at_idx" ON "checklist_categories" USING btree ("created_at");
  CREATE INDEX "subscribers_updated_at_idx" ON "subscribers" USING btree ("updated_at");
  CREATE INDEX "subscribers_created_at_idx" ON "subscribers" USING btree ("created_at");
  CREATE INDEX "contact_inquiries_updated_at_idx" ON "contact_inquiries" USING btree ("updated_at");
  CREATE INDEX "contact_inquiries_created_at_idx" ON "contact_inquiries" USING btree ("created_at");
  CREATE INDEX "exhibitor_inquiries_updated_at_idx" ON "exhibitor_inquiries" USING btree ("updated_at");
  CREATE INDEX "exhibitor_inquiries_created_at_idx" ON "exhibitor_inquiries" USING btree ("created_at");
  CREATE UNIQUE INDEX "hidden_pages_slug_idx" ON "hidden_pages" USING btree ("slug");
  CREATE INDEX "hidden_pages_exhibition_idx" ON "hidden_pages" USING btree ("exhibition_id");
  CREATE INDEX "hidden_pages_updated_at_idx" ON "hidden_pages" USING btree ("updated_at");
  CREATE INDEX "hidden_pages_created_at_idx" ON "hidden_pages" USING btree ("created_at");
  CREATE INDEX "promotional_popups_image_idx" ON "promotional_popups" USING btree ("image_id");
  CREATE INDEX "promotional_popups_updated_at_idx" ON "promotional_popups" USING btree ("updated_at");
  CREATE INDEX "promotional_popups_created_at_idx" ON "promotional_popups" USING btree ("created_at");
  CREATE UNIQUE INDEX "user_sessions_session_id_idx" ON "user_sessions" USING btree ("session_id");
  CREATE INDEX "user_sessions_updated_at_idx" ON "user_sessions" USING btree ("updated_at");
  CREATE INDEX "user_sessions_created_at_idx" ON "user_sessions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_exhibitions_id_idx" ON "payload_locked_documents_rels" USING btree ("exhibitions_id");
  CREATE INDEX "payload_locked_documents_rels_crazy_deals_id_idx" ON "payload_locked_documents_rels" USING btree ("crazy_deals_id");
  CREATE INDEX "payload_locked_documents_rels_discount_coupons_id_idx" ON "payload_locked_documents_rels" USING btree ("discount_coupons_id");
  CREATE INDEX "payload_locked_documents_rels_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_posts_id");
  CREATE INDEX "payload_locked_documents_rels_featured_brands_id_idx" ON "payload_locked_documents_rels" USING btree ("featured_brands_id");
  CREATE INDEX "payload_locked_documents_rels_checklist_profiles_id_idx" ON "payload_locked_documents_rels" USING btree ("checklist_profiles_id");
  CREATE INDEX "payload_locked_documents_rels_checklist_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("checklist_categories_id");
  CREATE INDEX "payload_locked_documents_rels_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("subscribers_id");
  CREATE INDEX "payload_locked_documents_rels_contact_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_inquiries_id");
  CREATE INDEX "payload_locked_documents_rels_exhibitor_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("exhibitor_inquiries_id");
  CREATE INDEX "payload_locked_documents_rels_hidden_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("hidden_pages_id");
  CREATE INDEX "payload_locked_documents_rels_promotional_popups_id_idx" ON "payload_locked_documents_rels" USING btree ("promotional_popups_id");
  CREATE INDEX "payload_locked_documents_rels_user_sessions_id_idx" ON "payload_locked_documents_rels" USING btree ("user_sessions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "exhibitions_program_schedule" CASCADE;
  DROP TABLE "exhibitions_faq" CASCADE;
  DROP TABLE "exhibitions" CASCADE;
  DROP TABLE "crazy_deals" CASCADE;
  DROP TABLE "discount_coupons" CASCADE;
  DROP TABLE "blog_posts" CASCADE;
  DROP TABLE "_blog_posts_v" CASCADE;
  DROP TABLE "featured_brands" CASCADE;
  DROP TABLE "checklist_profiles" CASCADE;
  DROP TABLE "checklist_categories_items" CASCADE;
  DROP TABLE "checklist_categories" CASCADE;
  DROP TABLE "subscribers" CASCADE;
  DROP TABLE "contact_inquiries" CASCADE;
  DROP TABLE "exhibitor_inquiries" CASCADE;
  DROP TABLE "hidden_pages" CASCADE;
  DROP TABLE "promotional_popups" CASCADE;
  DROP TABLE "user_sessions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_exhibitions_state";
  DROP TYPE "public"."enum_blog_posts_category";
  DROP TYPE "public"."enum_blog_posts_status";
  DROP TYPE "public"."enum__blog_posts_v_version_category";
  DROP TYPE "public"."enum__blog_posts_v_version_status";
  DROP TYPE "public"."enum_checklist_profiles_profile_slug";
  DROP TYPE "public"."enum_subscribers_state";
  DROP TYPE "public"."enum_subscribers_source";
  DROP TYPE "public"."enum_hidden_pages_type";
  DROP TYPE "public"."enum_user_sessions_checklist_profile";`)
}
