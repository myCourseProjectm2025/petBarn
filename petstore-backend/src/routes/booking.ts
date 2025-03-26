// import { Router } from "express";
// import { createBooking, getAllBookings, checkIfGivenDatesRangeIsAvailable, changeBookingStatus, getBookingById, getTotalRevenue, getBookedDates, getRecentBookings, getBookingByLocation, createManualBooking    } from "../controllers/booking";
// import adminAuth from "../middleware/adminAuth";
// const router = Router();
  
// /**
//  * @swagger
//  * tags:
//  *   name: Booking
//  *   description: Booking management
//  */

// /**
//  * @swagger
//  * /booking:
//  *   post:
//  *     summary: Create a new booking
//  *     tags: [Booking]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               date_from:
//  *                 type: string
//  *                 example: "2023-01-01"
//  *               date_to:
//  *                 type: string
//  *                 example: "2023-01-05"
//  *               product_id:
//  *                 type: number
//  *                 example: 1
//  *               phone_number:
//  *                 type: string
//  *                 example: "1234567890"
//  *               email:
//  *                 type: string
//  *                 example: "test@example.com"
//  *               Id_number:
//  *                 type: string
//  *                 example: "1234567890"
//  *               driver_licence_issue_date:
//  *                 type: string
//  *                 example: "2023-01-01"
//  *               residence_number:
//  *                 type: string
//  *                 example: "1234567890"
//  *               client_name:
//  *                 type: string
//  *                 example: "John Doe"
//  *               passport_number:
//  *                 type: string
//  *                 example: "1234567890"
//  *               border_number:
//  *                 type: string
//  *                 example: "1234567890"
//  *               driver_licence_number:
//  *                 type: string
//  *                 example: "1234567890"
//  *               amount:
//  *                 type: number
//  *                 example: 1000
//  *               client_type:
//  *                 type: string
//  *                 example: "resident"
//  *     responses:
//  *       201:
//  *         description: Booking created successfully
//  *       400:
//  *         description: Bad request
//  *       500:
//  *         description: Internal server error
//  */ 
// router.post("/", createBooking);

// /**
//  * @swagger
//  * /booking:
//  *   get:
//  *     summary: Get all bookings
//  *     tags: [Booking]
//  *     security:
//  *       - bearerAuth: []
//  *     requestHeader:
//  *       type: string
//  *       name: Authorization
//  *       description: The token for the admin
//  *     responses:
//  *       200:
//  *         description: Bookings retrieved successfully
//  *       500:
//  *         description: Internal server error
//  */   
  
// router.get("/", adminAuth, getAllBookings);



// /**
//  * @swagger
//  * /booking/check-dates:
//  *   post:
//  *     summary: Check if a given dates range is available
//  *     tags: [Booking]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               date_from:
//  *                 type: string 
//  *                 example: "2023-01-01"
//  *               date_to:
//  *                 type: string
//  *                 example: "2023-01-05"
//  *               product_id:
//  *                 type: number
//  *                 example: 1
//  *     responses:
//  *       200:
//  *         description: Dates range is available
//  *       400:
//  *         description: Dates range is not available
//  */ 

// router.post("/check-dates", checkIfGivenDatesRangeIsAvailable);

// /**
//  * @swagger
//  * /booking/total-revenue:
//  *   get:
//  *     summary: Get the total revenue
//  *     tags: [Booking]
//  *     security:
//  *       - bearerAuth: []
//  *     requestHeader:
//  *       type: string
//  *       name: Authorization
//  *       description: The token for the admin
//  *     responses:
//  *       200:
//  *         description: Total revenue retrieved successfully
//  *       500:
//  *         description: Internal server error
//  */

// router.get("/total-revenue", adminAuth, getTotalRevenue);       

// /**
//  * @swagger
//  * /booking/booked-dates:
//  *   get:
//  *     summary: Get all booked dates    
//  *     tags: [Booking]
//  *     security:
//  *       - bearerAuth: []
//  *     requestHeader:
//  *       type: string
//  *       name: Authorization
//  *       description: The token for the admin
//  *     responses:
//  *       200:
//  *         description: Booked dates retrieved successfully
//  *       500:
//  *         description: Internal server error
//  */     

// router.get("/booked-dates", adminAuth, getBookedDates);

// /**
//  * @swagger
//  * /booking/recent-bookings:
//  *   get:
//  *     summary: Get the 5 most recent bookings
//  *     tags: [Booking]
//  *     security:
//  *       - bearerAuth: []
//  *     requestHeader:
//  *       type: string
//  *       name: Authorization
//  *       description: The token for the admin
//  *     responses:
//  *       200:
//  *         description: Recent bookings retrieved successfully
//  *       500:
//  *         description: Internal server error
//  */

// router.get("/recent-bookings", adminAuth, getRecentBookings);

// /**
//  * @swagger
//  * /booking/manual:
//  *   post:
//  *     summary: Create a manual booking
//  *     tags: [Booking]
//  *     security:
//  *       - bearerAuth: []
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
//  *               date_from:
//  *                 type: string
//  *                 example: "2023-01-01"
//  *               date_to:
//  *                 type: string
//  *                 example: "2023-01-05"
//  *               location:
//  *                 type: string
//  *                 example: "Dubai"
//  *     responses:
//  *       200:
//  *         description: Manual booking created successfully
//  *       500:
//  *         description: Internal server error
//  */

// router.post("/manual", adminAuth, createManualBooking);

// /**
//  * @swagger
//  * /booking/location/{location}:
//  *   get:
//  *     summary: Get bookings by location
//  *     tags: [Booking]
//  *     security:
//  *       - bearerAuth: []
//  *     requestHeader:
//  *       type: string
//  *       name: Authorization
//  *       description: The token for the admin
//  *     parameters:
//  *       - name: location
//  *         in: path
//  *         required: true
//  *         type: string
//  *         description: The location of the bookings
//  *     responses:
//  *       200:
//  *         description: Bookings retrieved successfully
//  *       500:
//  *         description: Internal server error
//  */

// router.get("/location/:location", adminAuth, getBookingByLocation);


// /**
//  * @swagger
//  * /booking/status/{id}:
//  *   put:
//  *     summary: Change the status of a booking
//  *     tags: [Booking]
//  *     security:
//  *       - bearerAuth: []
//  *     requestHeader:
//  *       type: string
//  *       name: Authorization
//  *       description: The token for the admin
//  *     responses:   
//  *       200:
//  *         description: Booking status changed successfully
//  */ 

// router.put("/status/:id", adminAuth, changeBookingStatus);

// /**
//  * @swagger
//  * /booking/{id}:
//  *   get:
//  *     summary: Get a booking by ID
//  *     tags: [Booking]
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
//  *         description: The ID of the booking
//  *     responses:
//  *       200:
//  *         description: Booking retrieved successfully
//  */ 

// router.get("/:id", adminAuth, getBookingById);



// export default router;
