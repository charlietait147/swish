import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const sendResetEmail = async (to, resetUrl) => {
    // Users don't have a name field, so address them by their email username
    const name = to.split("@")[0];

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
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#e5e7eb; padding:40px 16px;">
          <tr>
            <td align="center">

              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:8px; overflow:hidden; font-family: Arial, sans-serif;">

                <!-- Navigation bar -->
                <tr>
                  <td style="background-color:#f97316; padding:12px 20px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align:middle;">
                          <img src="cid:swish-logo" alt="Swish logo" width="44" height="36" style="display:block; border:0;" />
                        </td>
                        <td style="vertical-align:middle; padding-left:8px; font-size:22px; font-weight:600; color:#ffffff;">
                          Swish .
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding:40px 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0">

                      <!-- Title -->
                      <tr>
                        <td align="center" style="font-size:20px; font-weight:bold; color:#111827;">
                          Hi there,
                        </td>
                      </tr>

                      <!-- Text -->
                      <tr>
                        <td style="padding-top:15px; font-size:14px; color:#374151; text-align:center;">
                          You requested a password reset. Click the button below.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:10px; font-size:14px; color:#374151; text-align:center;">
                          If you did not request a password reset, you can ignore this email.
                        </td>
                      </tr>

                      <!-- Button -->
                      <tr>
                        <td align="center" style="padding-top:30px;">
                          <a href="${resetUrl}"
                            style="background:#f97316; color:#ffffff; padding:12px 20px; text-decoration:none; border-radius:5px; font-size:14px; font-weight:bold; display:inline-block;">
                            Reset Password
                          </a>
                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td style="padding-top:20px; font-size:12px; color:#6b7280; text-align:center;">
                          This link will expire in 1 hour.
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      `,
      attachments: [
        {
          filename: "swish-logo.jpeg",
          path: path.join(__dirname, "../public/images/swish-updated-logo.jpeg"),
          cid: "swish-logo",
        },
      ],
    };
  
    await transporter.sendMail(mailOptions);
  };