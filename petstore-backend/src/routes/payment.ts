// import express from "express";
// import {
// createPayment,
// paymentCallback
// } from "../controllers/payment";

// const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name:  payment
//  *   description: payment management
//  */

// /**
//  * @swagger
//  * /payment/create-payment:
//  *   post:
//  *     summary: Create a new payment
//  *     tags: [payment]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *             required:
//  *               - booking_id
//  *               - payment_status
//  *               - transaction_id
//  *               - payment_method
//  *               - amount
//  *               - payment_gateway
//  *             example:
//  *               booking_id: 1
//  *               payment_status: "pending"
//  *               transaction_id: "1234567890"
//  *               payment_method: "credit_card"
//  *               amount: 100
//  *               payment_gateway: "clickpay"
//  *     responses:
//  *       201:
//  *         description: Product created successfully
//  *       400:
//  *         description: Invalid input
//  *       500:
//  *         description: Internal server error
//  */
// router.post("/create-payment", createPayment);

// /**
//  * @swagger
//  * /payment/payment-callback:
//  *   post:
//  *     summary: Payment callback
//  *     tags: [payment]  
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               profile_id:
//  *                 type: number
//  *                 example: 46145
//  *               tran_type:
//  *                 type: string
//  *                 example: "sale"
//  *               tran_class:
//  *                 type: string
//  *                 example: "ecom"
//  *               cart_id:
//  *                 type: string
//  *                 example: "4244b9fd-c7e9-4f16-8d3c-4fe7das248ca"
//  *               cart_description:
//  *                 type: string
//  *                 example: "Dummy Order 35925502061445345"
//  *               cart_currency:
//  *                 type: string
//  *                 example: "JOD"
//  *               cart_amount:
//  *                 type: number
//  *                 example: 46.17
//  *               return:
//  *                 type: string
//  *                 example: "http://localhost:8080/payment/callback"
//  *     responses:
//  *       201:
//  *         description: Product created successfully
//  *       400:
//  *         description: Invalid input
//  *       500:
//  *         description: Internal server error
//  */
// router.post("/payment-callback", paymentCallback);

// export default router;
