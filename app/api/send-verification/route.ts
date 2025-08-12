import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/connectDB'
import User from '@/models/User'
import { randomBytes } from 'crypto'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(req: Request) {
  const { email } = await req.json()

  await connectDB()

  const user = await User.findOne({ email })
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })

  const token = randomBytes(32).toString('hex')
  user.verificationToken = token
  user.emailVerified = false
  await user.save()

  await sendVerificationEmail(email, token)

  return NextResponse.json({ message: 'Verification email sent' })
}
