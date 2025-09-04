import express, { Request, Response } from "express";
import { db } from "./db";
import { regions, schoolRevisions, budgetRevisions } from "./dbs/schema";
import { and, eq, sql,ne } from "drizzle-orm";
let cors = require("cors");

const app = express();
app.use(cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
}));

app.use(express.json());

const sumSchool = {
    jmlPaud: sql<number>`sum(${schoolRevisions.jmlPaud})`,
    jmlSd: sql<number>`sum(${schoolRevisions.jmlSd})`,
    jmlSmp: sql<number>`sum(${schoolRevisions.jmlSmp})`,
    jmlSma: sql<number>`sum(${schoolRevisions.jmlSma})`,
};

const sumBudget = {
    anggaranPaud: sql<number>`sum(${budgetRevisions.anggaranPaud})`,
    anggaranSd: sql<number>`sum(${budgetRevisions.anggaranSd})`,
    anggaranSmp: sql<number>`sum(${budgetRevisions.anggaranSmp})`,
    anggaranSma: sql<number>`sum(${budgetRevisions.anggaranSma})`,
};


app.get("/totals/national", async (_: Request, res: Response) => {
    try
    {const [national] = await db
        .select({
            ...sumSchool,
            ...sumBudget,
        })
        .from(regions)
        .leftJoin(schoolRevisions, eq(schoolRevisions.regionId, regions.id))
        .leftJoin(budgetRevisions, eq(budgetRevisions.regionId, regions.id));

    res.json(national);}
catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
});
app.get("/totals/provinces", async (_: Request, res: Response) => {

    const provinceNames = await db
        .select({
            kodePro: regions.kodePro,
            namaProvinsi: regions.namaWilayah,
        })
        .from(regions)
        .where(eq(regions.kodeKab, "0"));

    const provinceTotals = await db
        .select({
            kodePro: regions.kodePro,
            ...sumSchool,
            ...sumBudget,
        })
        .from(regions)
        .leftJoin(schoolRevisions, eq(schoolRevisions.regionId, regions.id))
        .leftJoin(budgetRevisions, eq(budgetRevisions.regionId, regions.id))
        .where(ne(regions.kodeKab, "0"))
        .groupBy(regions.kodePro);

    const provinces = provinceTotals.map(total => ({
        ...total,
        namaProvinsi: provinceNames.find(p => p.kodePro === total.kodePro)?.namaProvinsi || 'Unknown Province'
    }));

    res.json(provinces);
});


app.get("/totals/provinces/:kodePro", async (req: Request, res: Response) => {
    const { kodePro } = req.params;

    try {
        const [province] = await db
            .select({
                kodePro: regions.kodePro,
                namaWilayah: sql<string>`MAX(${regions.namaWilayah})`,
                ...sumSchool,
                ...sumBudget,
            })
            .from(regions)
            .leftJoin(schoolRevisions, eq(schoolRevisions.regionId, regions.id))
            .leftJoin(budgetRevisions, eq(budgetRevisions.regionId, regions.id))
            .where(eq(regions.kodePro, kodePro))
            .groupBy(regions.kodePro);


        res.json(province);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
});


app.get("/totals/provinces/:kodePro/cities", async (req: Request, res: Response) => {
    const { kodePro } = req.params;

    const cities = await db
        .select({
            kodeKab: regions.kodeKab,
            namaWilayah: regions.namaWilayah,
            ...sumSchool,
            ...sumBudget,
        })
        .from(regions)
        .leftJoin(schoolRevisions, eq(schoolRevisions.regionId, regions.id))
        .leftJoin(budgetRevisions, eq(budgetRevisions.regionId, regions.id))
        .where(eq(regions.kodePro, kodePro))
        .groupBy(regions.kodeKab, regions.namaWilayah);

    res.json(cities);
});


app.get(
    "/totals/provinces/:kodePro/cities/:kodeKab",
    async (req: Request, res: Response) => {
        const { kodePro, kodeKab } = req.params;

        const [city] = await db
            .select({
                kodePro: regions.kodePro,
                kodeKab: regions.kodeKab,
                namaWilayah: regions.namaWilayah,
                ...sumSchool,
                ...sumBudget,
            })
            .from(regions)
            .leftJoin(schoolRevisions, eq(schoolRevisions.regionId, regions.id))
            .leftJoin(budgetRevisions, eq(budgetRevisions.regionId, regions.id))
            .where(and(eq(regions.kodePro, kodePro), eq(regions.kodeKab, kodeKab)))
            .groupBy(regions.kodePro, regions.kodeKab, regions.namaWilayah);

        res.json(city);
    }
);

app.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});
