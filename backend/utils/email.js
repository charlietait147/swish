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
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f97316; padding: 40px 0;">
          <tr>
            <td align="center">
              
              <table width="400" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:30px; font-family: Arial, sans-serif;">

                <!-- Title -->
                <tr>
                  <td align="center" style="font-size:20px; font-weight:bold; color:#111;">
                    Reset your password
                  </td>
                </tr>

                <!-- Text -->
                <tr>
                  <td style="padding-top:15px; font-size:14px; color:#444; text-align:center;">
                    You requested a password reset. Click the button below.
                  </td>
                </tr>

                <!-- Button -->
                <tr>
                  <td align="center" style="padding-top:30px;">
                    <a href="${resetUrl}" 
                      style="background:#f97316; color:#ffffff; padding:12px 20px; text-decoration:none; border-radius:5px; font-size:14px;">
                      Reset Password
                    </a>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding-top:20px; font-size:12px; color:#888; text-align:center;">
                    This link expires in 1 hour.
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      `,
    };
  
    await transporter.sendMail(mailOptions);
  };