import nodemailer from "nodemailer";

export const sendResetEmail = async (to, resetUrl) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or your provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: '"Swish Support" <no-reply@swish.com>',
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