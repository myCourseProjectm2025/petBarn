import pool from "./db";

const createProduct = async (product: any) => {
  const { name, location, day_price } = product;
  const result = await pool.query(
    "INSERT INTO product (name, location, day_price) VALUES ($1, $2, $3) RETURNING *",
    [name, location, day_price]
  );
  return result.rows[0];
};

const getProducts = async () => {
  const result = await pool.query("SELECT * FROM product");
  return result.rows;
};

const getProductById = async (id: number) => {
  const result = await pool.query("SELECT * FROM product WHERE id = $1", [id]);
  return result.rows[0];
};

const updateProduct = async (product: any) => {
  const { id, name, location, day_price,in_maintenance } = product;
  const result = await pool.query(
    "UPDATE product SET name = $1, location = $2, day_price = $3, in_maintenance = $4 WHERE id = $5 RETURNING *",
    [name, location, day_price, in_maintenance, id]
  );
  return result.rows[0];
};

const deleteProduct = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM product WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

const updateProductMaintenanceStatus = async (id: number,) => {
  const result = await pool.query(
    "UPDATE product SET in_maintenance = NOT in_maintenance WHERE id = $1 RETURNING *",
    [id]
  );
    return result.rows[0];
};

const getProductsLocation = async () => {
  const result = await pool.query("SELECT * FROM product_location");
  return result.rows;
};

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductMaintenanceStatus,
  getProductsLocation
};
