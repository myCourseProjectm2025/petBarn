import pool from "./db";
import { UserBodyType, UsersType, UserUpdateBodyType } from "../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import type { StringValue } from "ms";


const SALT_ROUNDS =  8;
const createUser = async (user: UserBodyType) => {
  const { first_name, last_name, role ,email,password,phone_number,address} = user;
  
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); 
  const result = await pool.query("INSERT INTO users (first_name, last_name, role, email, password, phone_number, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [first_name, last_name, role, email?.toLowerCase(), hashedPassword, phone_number, address]);
  return result.rows[0];
};

const loginUser = async (email: string, password: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email?.toLowerCase()]);
  const user = result.rows[0];
  if(!user) throw new Error("User not found");
  const decodedPassword = await bcrypt.compare(password, user.password);
  if(!decodedPassword) throw new Error("Invalid password");
  return user;
};

const generateToken = (user: UsersType,expiresIn?: StringValue | number) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    first_name: user.first_name,
    last_name: user.last_name,
    phone_number: user.phone_number,
  };
  return jwt.sign(payload, 'petstore-jwt-secret', { expiresIn:expiresIn ?? "24h" });
};



const getUserById = async (id: number) => {
  const result = await pool.query("SELECT id, first_name, last_name, email, phone_number, address,role FROM users WHERE id = $1", [id]);
  return result.rows[0];
};
const deActivateUser = async (id: number) => {
  const result = await pool.query("UPDATE users SET is_deleted = true WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};

const activateUser = async (id: number) => {
  const result = await pool.query("UPDATE users SET is_deleted = false WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};

const updateUserInfo = async (id: number, user: UserUpdateBodyType) => {
  const { first_name, last_name, phone_number, password } = user;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await pool.query("UPDATE users SET first_name = $1, last_name = $2, phone_number = $3, password = $4 WHERE id = $5 RETURNING *", [first_name, last_name, phone_number, hashedPassword, id]);
  return result.rows[0];
};

const sendCode = async (email: string) => {
  const result = await pool.query("SELECT id,email FROM users WHERE email = $1", [email]);
  const user = result.rows[0];
  if(!user) throw new Error("User not found");
  return user;
};

const verifyCode = async (email: string, code: string) => {
  
  const result = await pool.query(
    `SELECT u.id AS user_id, 
       u.is_email_verified,
       o.id AS otp_id, 
       o.expires_at 
      FROM users u 
      JOIN user_otp o ON u.id = o.user_id 
      WHERE u.email = $1 
      AND o.otp_code = $2 
      AND o.is_used = false`,
    [email.toLowerCase(), code]
  );
  
  if(result.rows.length === 0) throw new Error("Invalid OTP");
  if(result.rows[0].is_email_verified === false) {
    await pool.query("UPDATE users SET is_email_verified = true ,is_deleted = false WHERE id = $1", [result.rows[0].user_id]);
  }
  const user = await getUserById(result.rows[0].user_id);
  return {
    user: user,
    otp:result.rows[0],
  };
};


const markOtpAsUsed = async (otpId: string) => {
   await pool.query("UPDATE user_otp SET is_used = true WHERE id = $1 RETURNING *", [
    otpId,
  ]);
};

const resetPassword = async (id: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await pool.query("UPDATE users SET password = $1 WHERE id = $2 RETURNING *", [hashedPassword, id]);
  return result.rows[0];
};

const createOTP = async (userId: string, otpCode: string, expiresAt: Date) => {
  // Delete existing unused OTPs
  await pool.query(
    "DELETE FROM user_otp WHERE user_id = $1 AND is_used = false",
    [userId]
  );

  // Create new OTP
  const result = await pool.query(
    "INSERT INTO user_otp (user_id, otp_code, expires_at) VALUES ($1, $2, $3) RETURNING *",
    [userId, otpCode, expiresAt]
  );
  return result.rows[0];
};
export default {
  createUser,
  loginUser,
  generateToken,
  getUserById,
  deActivateUser,
  activateUser,
  updateUserInfo,
  sendCode,
  verifyCode,
  resetPassword,
  createOTP,
  markOtpAsUsed
};
