import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendOTP(email = "", otp: string) {
  try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Your Login OTP",
        text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
        html: `<p>Your OTP is: <strong>${otp}</strong></p><p>It will expire in 10 minutes.</p>`,
      });
   
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw error;
  }
}

export { sendOTP };

