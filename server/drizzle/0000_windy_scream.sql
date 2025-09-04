CREATE TABLE "budget_revisions" (
	"region_id" varchar NOT NULL,
	"anggaran_rev_paud" bigint NOT NULL,
	"anggaran_rev_sd" bigint NOT NULL,
	"anggaran_rev_smp" bigint NOT NULL,
	"anggaran_rev_sma" bigint NOT NULL,
	"total_anggaran_rev" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "regions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"kode_pro" varchar NOT NULL,
	"kode_kab" varchar NOT NULL,
	"nama_wilayah" varchar NOT NULL,
	"tingkat_label" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "school_revisions" (
	"region_id" varchar NOT NULL,
	"jml_rev_paud" integer NOT NULL,
	"jml_rev_sd" integer NOT NULL,
	"jml_rev_smp" integer NOT NULL,
	"jml_rev_sma" integer NOT NULL,
	"total_jml_rev_sekolah" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "budget_revisions" ADD CONSTRAINT "budget_revisions_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "school_revisions" ADD CONSTRAINT "school_revisions_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE cascade ON UPDATE no action;