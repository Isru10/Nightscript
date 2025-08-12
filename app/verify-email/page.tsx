'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get('email')
  const token = searchParams.get('token')

  const [status, setStatus] = useState('Checking email verification...')

  useEffect(() => {
    if (!email && !token) {
      setStatus('No email or token provided for verification.')
      return
    }

    if (token) {
      fetch('/api/verify-token', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(data => {
          console.log('Verification response:', data)
          setStatus(data.message)

          if (data.success) {
            console.log('Redirecting to /dashboard in 1 second...')
            setTimeout(() => {
              router.push('/dashboard')
            }, 1000)  // 1 second delay
          }
        })
        .catch(() => {
          console.log('Verification failed')
          setStatus('Verification failed')
        })
    }
  }, [email, token, router])

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Email Verification</h1>
      <p>{status}</p>
      {email && !token && (
        <p>
          Verification email sent to <strong>{email}</strong>
        </p>
      )}
    </div>
  )
}
