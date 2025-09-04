import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

export default defineConfig({
    dialect: "postgresql",
    schema: "./dbs/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
    }
});