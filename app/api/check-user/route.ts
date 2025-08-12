import { NextResponse } from 'next/server'


import User from '@/models/User'
import { connectDB } from '@/lib/connectDB'


export async function POST(req: Request) {
  const { email, password } = await req.json()
  await connectDB()

  const user = await User.findOne({ email })
  if (!user || user.password !== password || !user.emailVerified)
    return NextResponse.json(null, { status: 401 })

  return NextResponse.json({ id: user._id, email: user.email, name: user.name, role: user.role })
}
