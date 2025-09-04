import fs from "fs";
import csv from "csv-parser";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { regions, schoolRevisions, budgetRevisions } from "./dbs/schema";

interface CsvRow {
    kode_pro: string;
    kode_kab: string;
    nama_wilayah: string;
    tingkat_label: string;
    Jml_rev_paud: string;
    Jml_revi_sd: string;
    Jml_rev_smp: string;
    Jml_rev_sma: string;
    total_jml_rev_sekolah: string;
    anggaran_rev_paud: string;
    anggaran_rev_sd: string;
    anggaran_rev_smp: string;
    anggaran_rev_sma: string;
    total_anggaran_rev: string;
}

async function importCsv() {
    const results: CsvRow[] = [];

    fs.createReadStream("./data/sipd.csv")
        .pipe(csv())
        .on("data", (row) => results.push(row))
        .on("end", async () => {
            console.log(`Parsed ${results.length} rows`);

            for (const row of results) {
                const id = uuidv4();

                await db.insert(regions).values({
                    id,
                    kodePro: row.kode_pro,
                    kodeKab: row.kode_kab,
                    namaWilayah: row.nama_wilayah,
                    tingkatLabel: row.tingkat_label,
                });

                await db.insert(schoolRevisions).values({
                    regionId: id,
                    jmlPaud: parseInt(row.Jml_rev_paud || "0"),
                    jmlSd: parseInt(row.Jml_revi_sd || "0"),
                    jmlSmp: parseInt(row.Jml_rev_smp || "0"),
                    jmlSma: parseInt(row.Jml_rev_sma || "0"),
                    totalJml: parseInt(row.total_jml_rev_sekolah || "0"),
                });

                const clean = (val: string) => parseInt(val.replace(/[^0-9]/g, "") || "0");

                await db.insert(budgetRevisions).values({
                    regionId: id,
                    anggaranPaud: clean(row.anggaran_rev_paud),
                    anggaranSd: clean(row.anggaran_rev_sd),
                    anggaranSmp: clean(row.anggaran_rev_smp),
                    anggaranSma: clean(row.anggaran_rev_sma),
                    totalAnggaran: clean(row.total_anggaran_rev),
                });
            }

            console.log("CSV Import finished");
            process.exit(0);
        });
}

importCsv().catch((err) => {
    console.error(err);
    process.exit(1);
});
