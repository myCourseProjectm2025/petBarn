import pool from "./db";

const createContact = async (contact: any) => {
  const { name, email, message } = contact;
  const result = await pool.query("INSERT INTO contact (name, email, message) VALUES ($1, $2, $3) RETURNING *", [name, email, message]);
  return result.rows[0];
};

const getAllMessages = async () => {
  const result = await pool.query("SELECT * FROM contact");
  return result.rows;
};

const getMessageById = async (id: number) => {
  const result = await pool.query("SELECT * FROM contact WHERE id = $1", [id]);
  return result.rows[0];
};

const deleteMessageById = async (id: number) => {
  const result = await pool.query("DELETE FROM contact WHERE id = $1", [id]);
  return result.rows[0];
};

export default {
  createContact,
  getAllMessages,
  getMessageById,
  deleteMessageById,
  
};

