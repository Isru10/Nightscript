import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/connectDB'
import User from '@/models/User'

export async function POST(req: Request) {
  const { token } = await req.json()
  await connectDB()

  const user = await User.findOne({ verificationToken: token })
  if (!user) {
    return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 400 })
  }

  user.emailVerified = true
  user.verificationToken = undefined
  await user.save()

  return NextResponse.json({ success: true, message: 'Email verified successfully' })
}
