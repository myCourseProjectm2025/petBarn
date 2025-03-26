// import express from "express";
// import {
//   createProduct,
//   deleteProduct,
//   getProductById,
//   getProducts,
//   updateProduct,
//   updateProductMaintenanceStatus,
//   getProductsLocation
// } from "../controllers/product";
// import adminAuth from "../middleware/adminAuth";

// const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Product
//  *   description: Product management
//  */

// /**
//  * @swagger
//  * /products:
//  *   post:
//  *     summary: Create a new product
//  *     tags: [Product]
//  *     requestHeader:
//  *       type: string
//  *       name: Authorization
//  *       description: The token for the admin
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               location:
//  *                 type: string
//  *               day_price:
//  *                 type: number
//  *     responses:
//  *       201:
//  *         description: Product created successfully
//  *       400:
//  *         description: Invalid input
//  *       500:
//  *         description: Internal server error
//  */
// router.post("/", adminAuth, createProduct);

// /**
//  * @swagger
//  * /products:
//  *   get:
//  *     summary: Retrieve all products
//  *     tags: [Product]
//  *     responses:
//  *       200:
//  *         description: A list of products
//  *       500:
//  *         description: Internal server error
//  */
// router.get("/", getProducts);


// /**
//  * @swagger
//  * /products/location:
//  *   get:
//  *     summary: Retrieve all product locations
//  *     tags: [Product]
//  *     responses:
//  *       200:
//  *         description: A list of product locations
//  *       500:
//  *         description: Internal server error
//  */
// router.get("/location", getProductsLocation);



// /**
//  * @swagger
//  * /products/maintenance-status/{id}:
//  *   put:
//  *     summary: Update the maintenance status of a product
//  *     tags: [Product]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: Maintenance status updated successfully
//  *       404:
//  *         description: Product not found
//  *       500:
//  *         description: Internal server error
//  */
// router.put("/maintenance-status/:id", adminAuth, updateProductMaintenanceStatus);


// /**
//  * @swagger
//  * /products/{id}:
//  *   get:
//  *     summary: Get a product by ID
//  *     tags: [Product]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: Product data
//  *       404:
//  *         description: Product not found
//  *       500:
//  *         description: Internal server error
//  */
// router.get("/:id", getProductById);

// /**
//  * @swagger
//  * /products/edit:
//  *   put:
//  *     summary: Update a product
//  *     tags: [Product]
//  *     security:
//  *       - BearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               location:
//  *                 type: string
//  *               day_price:
//  *                 type: number
//  *     responses:
//  *       200:
//  *         description: Product updated successfully
//  *       400:
//  *         description: Invalid input
//  *       500:
//  *         description: Internal server error
//  */
// router.put("/edit", adminAuth, updateProduct);

// /**
//  * @swagger
//  * /products/delete/{id}:
//  *   delete:
//  *     summary:  delete a product
//  *     tags: [Product]
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: Product is deleted
//  *       404:
//  *         description: Product not found
//  *       500:
//  *         description: Internal server error
//  */
// router.delete("/delete/:id", adminAuth, deleteProduct);

// export default router;
