import pool from "./db";
import { ProductType,ProductBodyType } from "../types";

const createProduct = async (product: ProductBodyType) => {
  const { amount, description, quantity, brand, image_url, product_name, user_id } = product;
  const result = await pool.query(
    "INSERT INTO products (amount, description, quantity, brand, image_url, product_name, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [amount, description, quantity, brand, image_url, product_name, user_id]
  );
  return result.rows[0];
};

const getProducts = async () => {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
};

const getProductById = async (id: number) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

const updateProduct = async (product: ProductBodyType,productId:number) => {
  const { amount, description, quantity, brand, image_url, product_name } = product;
  const result = await pool.query(
    "UPDATE products SET amount = $1, description = $2, quantity = $3, brand = $4, image_url = $5, product_name = $6 WHERE id = $7 RETURNING *",
    [amount, description, quantity, brand, image_url, product_name, productId]
  );
  return result.rows[0];
};

const deleteProduct = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM products WHERE id = $1",
    [id]
  );
  return result.rows[0];
};


export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
