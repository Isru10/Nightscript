import { type NextRequest, NextResponse } from "next/server"
import UserModel from "@/models/User"
import { connectDB } from "@/lib/connectDB"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Verification token is required" }, { status: 400 })
    }

    console.log("Verification token:", token)

    await connectDB()

    const user = await UserModel.findOne({
      verificationToken: token,
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid verification token" }, { status: 400 })
    }

    await UserModel.findByIdAndUpdate(user._id, {
      emailVerified: true,
      verificationToken: null,
    })

    // Redirect to success page
    return NextResponse.redirect(new URL("/auth/verified", req.url))
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
