import nodemailer from "nodemailer";

export const sendResetEmail = async (to, resetUrl) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu", // or your provider
      port: 465,
      secure: true, // true for 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: `Swish Support <${process.env.EMAIL_USER}>`,
      to,
      subject: "Reset your Swish password",
      html: `
        <p>You requested a password reset.</p>
        <p>Click this link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>
        <p>This link will expire in 1 hour.</p>
      `,
    };
  
    await transporter.sendMail(mailOptions);
  };