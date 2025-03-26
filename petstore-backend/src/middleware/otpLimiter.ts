import rateLimit from "express-rate-limit";
import pool from "../model/db";

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
});
export async function logLoginAttempt(
  id: any,
  ip_address: any,
  is_successful: any
) {
  await pool.query(
    "INSERT INTO admin_login_attempts (id, ip_address, is_successful) VALUES ($1, $2, $3)",
    [id, ip_address, is_successful]
  );
}
export default otpLimiter;
