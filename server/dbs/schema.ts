import {pgTable, varchar, integer, bigint, uuid} from "drizzle-orm/pg-core";

export const regions = pgTable("regions", {
    id: uuid("id").primaryKey(),
    kodePro: varchar("kode_pro").notNull(),
    kodeKab: varchar("kode_kab").notNull(),
    namaWilayah: varchar("nama_wilayah").notNull(),
    tingkatLabel: varchar("tingkat_label").notNull(),
});

export const schoolRevisions = pgTable("school_revisions", {
    regionId: uuid("region_id")
        .notNull()
        .references(() => regions.id, { onDelete: "cascade" }),

    jmlPaud: integer("jml_rev_paud").notNull(),
    jmlSd: integer("jml_rev_sd").notNull(),
    jmlSmp: integer("jml_rev_smp").notNull(),
    jmlSma: integer("jml_rev_sma").notNull(),
    totalJml: integer("total_jml_rev_sekolah").notNull(),
});

export const budgetRevisions = pgTable("budget_revisions", {
    regionId: uuid("region_id")
        .notNull()
        .references(() => regions.id, { onDelete: "cascade" }),

    anggaranPaud: bigint("anggaran_rev_paud", { mode: "number" }).notNull(),
    anggaranSd: bigint("anggaran_rev_sd", { mode: "number" }).notNull(),
    anggaranSmp: bigint("anggaran_rev_smp", { mode: "number" }).notNull(),
    anggaranSma: bigint("anggaran_rev_sma", { mode: "number" }).notNull(),
    totalAnggaran: bigint("total_anggaran_rev", { mode: "number" }).notNull(),
});