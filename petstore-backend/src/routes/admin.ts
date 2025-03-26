// import { Router } from "express";
// import { initAdmin, requestOTP, verifyOTP } from "../controllers/adminLogin";
// import otpLimiter from "../middleware/otpLimiter";
// const router = Router();
// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     AdminOTPRequest:
//  *       type: object
//  *       required:
//  *         - email
//  *       properties:
//  *         email:
//  *           type: string
//  *           format: email
//  *           description: Admin's email address
//  *           example: admin@example.com
//  *
//  *     AdminOTPVerify:
//  *       type: object
//  *       required:
//  *         - email
//  *         - otp
//  *       properties:
//  *         email:
//  *           type: string
//  *           format: email
//  *           description: Admin's email address
//  *           example: admin@example.com
//  *         otp:
//  *           type: string
//  *           minLength: 6
//  *           maxLength: 6
//  *           description: 6-digit OTP code
//  *           example: "123456"
//  *
//  *     Error:
//  *       type: object
//  *       properties:
//  *         error:
//  *           type: string
//  *           description: Error message
//  *
//  *   responses:
//  *     UnauthorizedError:
//  *       description: Authentication information is missing or invalid
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Error'
//  *     NotFoundError:
//  *       description: The requested resource was not found
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Error'
//  */

// /**
//  * @swagger
//  * tags:
//  *   name: Admin
//  *   description: Admin authentication endpoints
//  */

// /**
//  * @swagger
//  * /admin/init-admin:
//  *   post:
//  *     summary: Initialize admin account
//  *     tags: [Admin]
//  *     description: Initializes the admin account with default credentials
//  *     responses:
//  *       200:
//  *         description: Admin initialized successfully
//  *       500:
//  *         description: Internal server error
//  */
// router.post("/init-admin", initAdmin);

// /**
//  * @swagger
//  * /admin/request-otp:
//  *   post:
//  *     summary: Request OTP for admin login
//  *     tags: [Admin]
//  *     description: Sends a one-time password to the admin's email address
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: OTP sent successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: OTP sent successfully
//  *       429:
//  *         description: Too many requests - rate limit exceeded
//  *       500:
//  *         description: Internal server error
//  */
// router.post("/request-otp", otpLimiter, requestOTP);
// /**
//  * @swagger
//  * /admin/verify-otp:
//  *   post:
//  *     summary: Verify OTP and login
//  *     tags: [Admin]
//  *     description: Verifies the OTP and returns a JWT token upon successful verification
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *               otp:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Login successful
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Login successful
//  *                 token:
//  *                   type: string
//  *                   description: JWT token for authentication
//  *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
//  *       500:
//  *         description: Internal server error
//  */
// router.post("/verify-otp", verifyOTP);

// export default router;
