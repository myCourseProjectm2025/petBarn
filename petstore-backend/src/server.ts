import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import pool from "./model/db";
// import adminRoutes from "./routes/admin";
// import contactRoutes from "./routes/contact";
// import bookingRoutes from "./routes/booking";
// import productRoutes from "./routes/product";
// import paymentRoutes from "./routes/payment";
import usersRoutes from "./routes/users";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PetStore API",
      version: "1.0.0",
      description: "PetStore API",
    },
    components: {
      securitySchemes: {
          bearerAuth: { 
            type: "http", 
            scheme: "bearer", 
            bearerFormat: "JWT", 
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Ensure this path is correct
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/account", usersRoutes);
// app.use("/admin", adminRoutes);
// app.use("/products", productRoutes);
// app.use("/contact", contactRoutes);
// app.use("/booking", bookingRoutes);
// app.use("/payment", paymentRoutes);
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Server is running!", time: result.rows[0].now });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
  }
});
// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
