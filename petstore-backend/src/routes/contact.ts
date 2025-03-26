// import { Router } from "express";
// import { contactUs, getAllMessages, getMessageById ,deleteMessageById} from "../controllers/contact";
// import adminAuth from "../middleware/adminAuth";

// const router = Router();

// /**
//  * @swagger
//  * /contact:
//  *   post:
//  *     summary: Send a contact form
//  *     description: Send a contact form to the admin
//  *     tags: [Contact]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 example: "John Doe"
//  *               email:
//  *                 type: string
//  *                 example: "john.doe@example.com"
//  *               message:
//  *                 type: string
//  *                 example: "I need help with my account"
//  *     responses:
//  *       200:
//  *         description: Email sent successfully
//  *       400:
//  *         description: Invalid request body
//  *       500:
//  *         description: Internal server error
//  */
// router.post("/", contactUs);  

// /**
//  * @swagger
//  * /contact:
//  *   get:
//  *     summary: Get all messages
//  *     description: Get all messages from the database
//  *     tags: [Contact]
//  *     requestHeader:
//  *       type: string
//  *       name: Authorization
//  *       description: The token for the admin
//  *     responses:
//  *       200:
//  *         description: Messages retrieved successfully
//  *       500:
//  *         description: Internal server error
//  */ 
// router.get("/",adminAuth, getAllMessages);

// /**
//  * @swagger
//  * /contact/delete/{id}:
//  *   delete:
//  *     summary: Delete a message by ID
//  *     description: Delete a message by ID from the database
//  *     tags: [Contact]
//  *     security:
//  *       - bearerAuth: []
//  *     requestHeader:
//  *       type: string
//  *       name: Authorization
//  *       description: The token for the admin
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         type: string
//  *     responses:
//  *       200:
//  *         description: Message deleted successfully
//  *       404:
//  *         description: Message not found
//  *       500:
//  *         description: Internal server error
//  */
// router.delete("/delete/:id", adminAuth, deleteMessageById);

// /**
//  * @swagger
//  * /contact/{id}:
//  *   get:
//  *     summary: Get a message by ID
//  *     description: Get a message by ID from the database
//  *     tags: [Contact]
//  *     security:
//  *       - bearerAuth: []
//  *     requestHeader:
//  *       type: string
//  *       name: Authorization
//  *       description: The token for the admin
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         type: string
//  *     responses:
//  *       200:
//  *         description: Message retrieved successfully
//  *       404:
//  *         description: Message not found
//  *       500:
//  *         description: Internal server error
//  */
// router.get("/:id", adminAuth, getMessageById);




// export default router;
