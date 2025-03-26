import pool from "./db";

const findByEmail = async (email: string) => {
  const result = await pool.query(
    "SELECT id, email, phone FROM admin WHERE email = $1 AND is_active = true AND is_deleted = 0",
    [email.toLowerCase()]
  );
  return result.rows[0];
};

const findByPhone = async (phone: string) => {
  const result = await pool.query(
    "SELECT id, email, phone FROM admin WHERE phone = $1 AND is_active = true AND is_deleted = 0",
    [phone]
  );
  return result.rows[0];
};

const updateLastLogin = async (adminId: string) => {
  await pool.query("UPDATE admin SET last_login_at = NOW() WHERE id = $1", [
    adminId,
  ]);
};

const createOTP = async (adminId: string, otpCode: string, expiresAt: Date) => {
  // Delete existing unused OTPs
  await pool.query(
    "DELETE FROM admin_otp WHERE admin_id = $1 AND is_used = false",
    [adminId]
  );

  // Create new OTP
  const result = await pool.query(
    "INSERT INTO admin_otp (admin_id, otp_code, expires_at) VALUES ($1, $2, $3) RETURNING *",
    [adminId, otpCode, expiresAt]
  );
  return result.rows[0];
};

const findById = async (adminId: string) => {
  const result = await pool.query(
    "SELECT id, email, phone FROM admin WHERE id = $1 AND is_active = true AND is_deleted = 0",
    [adminId]
  );
  return result.rows[0];
};

const verifyOTP = async (email: string, otpCode: string) => {
  const result = await pool.query(
    `SELECT a.id AS admin_id, 
       o.id AS otp_id, 
       o.expires_at 
      FROM admin a 
      JOIN admin_otp o ON a.id = o.admin_id 
      WHERE a.email = $1 
      AND o.otp_code = $2 
      AND o.is_used = false 
      AND a.is_active = true 
      AND a.is_deleted = 0`,
    [email.toLowerCase(), otpCode]
  );
  return result.rows[0];
};

const markOTPAsUsed = async (otpId: string) => {
  await pool.query("UPDATE admin_otp SET is_used = true WHERE id = $1", [
    otpId,
  ]);
};

const logLoginAttempt = async (
  adminId: string,
  ipAddress: string,
  isSuccessful: boolean
) => {
  await pool.query(
    "INSERT INTO admin_login_attempts (admin_id, ip_address, is_successful) VALUES ($1, $2, $3)",
    [adminId, ipAddress, isSuccessful]
  );
};

const initAdmin = async () => {
  const result = await pool.query(
    "INSERT INTO admin (email, phone) VALUES ($1, $2)",
    [process.env.ADMIN_EMAIL?.toLowerCase(), process.env.ADMIN_PHONE]
  );
  return result.rows[0];
};

export default {
  findByEmail,
  updateLastLogin,
  createOTP,
  verifyOTP,
  markOTPAsUsed,
  logLoginAttempt,
  initAdmin,
  findByPhone,
  findById,
};
