import jwt from "jsonwebtoken";
import AdminModel from "../model/adminModel";
import { sendOTP } from "../utils/notifications";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateToken = (adminId: string) => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET as string, {
    expiresIn: "24h",
  });
};

const requestOTP = async (req: any, res: any) => {
  const { email } = req.body;
  const ipAddress = req.ip;

  try {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60000); // 10 minutes
    if (email) {
      const admin = await AdminModel.findByEmail(email);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
      await AdminModel.createOTP(admin.id, otp, expiresAt);
      await AdminModel.logLoginAttempt(admin.id, ipAddress, false);
    } 
    await sendOTP(email, otp);

    res.json({ message: "OTP sent successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const verifyOTP = async (req: any, res: any) => {
  const { email, otp } = req.body;
  const ipAddress = req.ip;

  try {
    // Verify OTP
    const otpData = await AdminModel.verifyOTP(email, otp);
    if (!otpData) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    // Check expiration
    if (new Date() > new Date(otpData.expires_at)) {
      return res.status(401).json({ error: "OTP has expired" });
    }

    // Mark OTP as used
    await AdminModel.markOTPAsUsed(otpData.id);

    // Update last login
    await AdminModel.updateLastLogin(otpData.admin_id);

    // Log successful attempt
    await AdminModel.logLoginAttempt(otpData.admin_id, ipAddress, true);

    // Generate token
    const token = generateToken(otpData.admin_id);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const initAdmin = async (req: any, res: any) => {
  try {
    
    await AdminModel.initAdmin();
    res.json({ message: "Admin initialized successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export { initAdmin, requestOTP, verifyOTP };
