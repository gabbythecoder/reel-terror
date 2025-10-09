import pg from "pg";

const dbConnectionString = process.env.NEXT_PUBLIC_DB_URL;

export const db = new pg.Pool({
  connectionString: dbConnectionString,
});
