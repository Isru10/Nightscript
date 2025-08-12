import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VerifiedPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 border border-green-600 rounded-lg p-8 text-center">
        <div className="text-green-400 mb-6">
          <div className="text-6xl mb-4">🎭</div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to Horror Hub!</h1>
          <p className="text-gray-300">
            Your email has been successfully verified. You can now sign in and start exploring terrifying content.
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/auth/signin">
            <Button className="w-full bg-red-600 hover:bg-red-700">Sign In Now</Button>
          </Link>

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
