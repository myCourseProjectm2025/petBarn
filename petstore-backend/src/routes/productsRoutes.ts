import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController";
import { authenticateUser } from "../middleware/authentication";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */

/*
export type ProductBodyType = {
  amount: string;
  description: string;
  quantity: number;
  brand: number;
  image_url: string;
  product_name: string;
  user_id: number;
}

*/


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestHeader:
 *       type: string
 *       name: Authorization
 *       description: The token for the admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: number
 *               brand:
 *                 type: number
 *               image_url:
 *                 type: string
 *               product_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticateUser, createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Internal server error
 */
router.get("/", getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product data
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /products/edit:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               day_price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.put("/edit", authenticateUser, updateProduct);

/**
 * @swagger
 * /products/delete/{id}:
 *   delete:
 *     summary:  delete a product
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product is deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", authenticateUser, deleteProduct);

export default router;
