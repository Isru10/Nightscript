"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const token = searchParams.get("token")

    if (!token) {
      setStatus("error")
      setMessage("No verification token provided")
      return
    }

    // Verify the token
    fetch(`/api/auth/verify?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setStatus("error")
          setMessage(data.error)
        } else {
          setStatus("success")
          setMessage("Email verified successfully!")
        }
      })
      .catch(() => {
        setStatus("error")
        setMessage("Verification failed")
      })
  }, [searchParams])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 border border-red-600 rounded-lg p-8 text-center">
        <div className="mb-6">
          {status === "loading" && (
            <div className="text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-bold">Verifying your email...</h2>
            </div>
          )}

          {status === "success" && (
            <div className="text-green-400">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-white mb-2">Email Verified!</h2>
              <p className="text-gray-300">{message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="text-red-400">
              <div className="text-4xl mb-4">❌</div>
              <h2 className="text-xl font-bold text-white mb-2">Verification Failed</h2>
              <p className="text-gray-300">{message}</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {status === "success" && (
            <Link href="/auth/signin">
              <Button className="w-full bg-red-600 hover:bg-red-700">Sign In Now</Button>
            </Link>
          )}

          {status === "error" && (
            <Link href="/auth/signup">
              <Button className="w-full bg-red-600 hover:bg-red-700">Try Again</Button>
            </Link>
          )}

          <Link href="/">
            <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
