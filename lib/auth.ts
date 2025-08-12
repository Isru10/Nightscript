import NextAuth, { type AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google" // Added Google provider import
import { connectDB } from "@/lib/connectDB"
import UserModel from "@/models/User"
import bcrypt from "bcryptjs"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        await connectDB()

        const user = await UserModel.findOne({ email: credentials.email })

        if (!user) return null
        if (!user.emailVerified) return null // block login if not verified

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await connectDB()

        const existingUser = await UserModel.findOne({ email: user.email })

        if (!existingUser) {
          // Create new user for Google OAuth
          await UserModel.create({
            email: user.email,
            name: user.name,
            image: user.image,
            provider: "google",
            emailVerified: true, // Google accounts are pre-verified
            role: "user",
          })
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      } else if (token.email) {
        // Fetch role from database for existing sessions
        await connectDB()
        const dbUser = await UserModel.findOne({ email: token.email })
        if (dbUser) token.role = dbUser.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
