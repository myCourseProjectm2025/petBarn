import express from "express";
import { authenticateUser } from "../middleware/authentication";
import { getUserById, register, login, sendCode, verifyCode, resetPassword, updateUserInfo, deleteUser } from "../controllers/usersController";

const router = express.Router();

  
/**
 * @swagger
 * tags:
 *   name: account
 *   description: Account management
 */



/**
 * @swagger
 * /account/user-info:
 *   get:
 *     summary: Get user information
 *     tags: [account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */ 
router.get("/user-info", authenticateUser, getUserById);



/**
 * @swagger
 * /account/register:
 *   post:
 *     summary: Register a new user
 *     tags: [account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: The first name of the user
 *               last_name:
 *                 type: string
 *                 description: The last name of the user
 *               role:
 *                 type: string
 *                 description: The role of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *               phone_number:
 *                 type: string
 *                 description: The phone number of the user
 *               address:
 *                 type: number
 *                 description: The address of the user
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post("/register", register);

/**
 * @swagger
 * /account/login:
 *   post:
 *     summary: Login a user
 *     tags: [account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/login", login);

/**
 * @swagger
 * /account/send-code:
 *   post:
 *     summary: Send a code to the user
 *     tags: [account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *     responses:
 *       200:
 *         description: Code sent successfully
 *       400:
 *         description: Bad request 
 *       500:
 *         description: Internal server error
 */
router.post("/send-code", sendCode);

/**
 * @swagger
 * /account/verify-code:
 *   post:
 *     summary: Verify a code
 *     tags: [account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               code:
 *                 type: string
 *                 description: The code of the user
 *     responses:
 *       200:
 *         description: Code verified successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/verify-code", verifyCode);

/**
 * @swagger
 * /account/reset-password:
 *   post:
 *     summary: Reset a user's password
 *     tags: [account]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password of the user
 *     responses:
 *       200:
 *         description: Password reset successfully 
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/reset-password", authenticateUser, resetPassword);

/**
 * @swagger
 * /account/delete:
 *   delete:
 *     summary: Delete a user
 *     tags: [account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.delete("/delete", authenticateUser, deleteUser);

export default router;