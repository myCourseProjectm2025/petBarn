import { Payment } from "../types";
import pool from "./db";

const initPaymentSessionWithClickPay = async (payment: Partial<Payment>) => {
const result =await pool.query('INSERT INTO payments (booking_id, payment_status, transaction_id, payment_method, amount, payment_gateway) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [payment.booking_id, payment.payment_status, payment.transaction_id, payment.payment_method, payment.amount, payment.payment_gateway]);
return result.rows[0];
};

export {initPaymentSessionWithClickPay};


