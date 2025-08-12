import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { connectDB } from "@/lib/connectDB"
import UserModel from "@/models/User"
import { sendVerificationEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 })
    }

    await connectDB()

    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const verificationToken = crypto.randomBytes(32).toString("hex")

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      emailVerified: false, // Set to false until verified
      verificationToken, // Add verification token
      role: "user",
    })

    const emailResult = await sendVerificationEmail(email, verificationToken)

    if (!emailResult.success) {
      // If email fails, still create user but log error
      console.error("Failed to send verification email:", emailResult.error)
    }

    return NextResponse.json(
      {
        message: "User created successfully. Please check your email to verify your account.",
        userId: user._id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
