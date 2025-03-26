import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_CONTACT_HOST, // Corrected variable name
  port: Number(process.env.EMAIL_CONTACT_PORT), // Ensure port is used
  secure: process.env.EMAIL_CONTACT_PORT === "465", // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_CONTACT_USER,
    pass: process.env.EMAIL_CONTACT_PASSWORD,
  },
});

async function sendContactUsEmail(
  name: string,
  email: string,
  message: string
) {
  const subject = "CAMPER.SA - website user";

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_CONTACT_USER, // Use the authenticated email
      to: "info@camper.sa",
      subject: `New Contact Form Submission: ${subject}`,
      html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}

export { sendContactUsEmail };
