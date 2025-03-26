import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, 
  },
});

pool.on("connect", () => {
  console.log("✅ Connected to Neon PostgreSQL database (Hasura)");
});

pool.on("error", (err) => {
  console.error("❌ Database error:", err);
});

export default pool;
