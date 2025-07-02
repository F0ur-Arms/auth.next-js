import nodemailer from "nodemailer";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    console.log("📧 Preparing to send email:", { email, emailType, userId });

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    console.log("🔐 Hashed token generated:", hashedToken);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
      console.log("✅ Updated user with verification token");
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: new Date(Date.now() + 1000 * 60 * 60),
      });
      console.log("✅ Updated user with reset token");
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const linkPath = emailType === "VERIFY" ? "verifyemail" : "changePass";
    const url = `${process.env.DOMAIN}/${linkPath}?token=${hashedToken}`;

    const mailOptions = {
      from: "apoorv@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${url}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy the link below:<br>${url}</p>`,
    };

    console.log("📬 Sending email via transporter...");
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("✅ Mail sent:", mailResponse);

    return mailResponse;
  } catch (error: any) {
    console.error("❌ Error in sendEmail function:", error);
    throw new Error("❌ sendEmail failed: " + error.message);
  }
};

