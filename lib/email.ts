
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${token}`

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: email,
    subject: "🎭 Verify Your Horror Hub Account",
    html: `
      <div style="background-color: #0a0a0a; color: #ffffff; padding: 40px; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border: 2px solid #dc2626; border-radius: 10px; padding: 30px;">
          <h1 style="color: #dc2626; text-align: center; margin-bottom: 30px; font-size: 28px;">
            🎭 Welcome to Horror Hub
          </h1>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
            Thank you for joining our horror community! To complete your registration and start exploring terrifying content, please verify your email address.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px;">
              Verify Email Address
            </a>
          </div>
          
          <p style="font-size: 14px; color: #888; margin-top: 25px;">
            If the button doesn't work, copy and paste this link into your browser:
            <br>
            <span style="color: #dc2626; word-break: break-all;">${verificationUrl}</span>
          </p>
          
          <p style="font-size: 14px; color: #888; margin-top: 20px;">
            This verification link will expire in 24 hours. If you didn't create an account, please ignore this email.
          </p>
          
          <div style="border-top: 1px solid #333; margin-top: 30px; padding-top: 20px; text-align: center;">
            <p style="color: #666; font-size: 12px;">
              Horror Hub - Where nightmares come to life
            </p>
          </div>
        </div>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error }
  }
}
