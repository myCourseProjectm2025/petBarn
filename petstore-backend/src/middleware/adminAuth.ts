import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import AdminModel from "../model/adminModel";

interface DecodedToken {
  adminId: string;
}

async function authenticateAdmin(
  req: any & { admin?: any },
  res: any,
  next: NextFunction
) {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Ensure secret key exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT secret is not set in environment variables");
      return res.status(500).json({ error: "Internal server error" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

    // Get admin from database
    const admin = await AdminModel.findById(decoded.adminId); // Use findById instead of findByEmail
    if (!admin) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Attach admin to request
    req.admin = admin;
    next();
  } catch (error: any) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default authenticateAdmin;
