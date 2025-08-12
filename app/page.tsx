"use client"

import { useSession, signOut } from "next-auth/react"
import { SessionProvider } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Play, Users, Shield, Zap, Mail, Phone, MapPin } from "lucide-react"

function HomePage() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  const horrorBackgrounds = [
    "/placeholder.svg?height=1080&width=1920",
    "/placeholder.svg?height=1080&width=1920",
    "/placeholder.svg?height=1080&width=1920",
    "/placeholder.svg?height=1080&width=1920",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % horrorBackgrounds.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-red-500 text-xl animate-pulse">Loading...</div>
      </div>
    )
  }

  if (session) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-black to-gray-900">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Welcome to Horror Hub</h1>
          <p className="text-gray-300 text-lg">Hello, {session.user?.name || session.user?.email}</p>
          <p className="text-gray-400 mb-6">Video feed coming soon...</p>
          <Button
            onClick={() => signOut()}
            variant="outline"
            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white px-8 py-3 bg-transparent"
          >
            Sign Out
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-red-500 hover:text-red-400 transition-colors cursor-pointer">
                Horror Hub
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="text-gray-300 hover:text-red-400 transition-colors">
                  Home
                </a>
                <a href="#features" className="text-gray-300 hover:text-red-400 transition-colors">
                  Features
                </a>
                <a href="#contact" className="text-gray-300 hover:text-red-400 transition-colors">
                  Contact
                </a>
              </div>
            </div>

            <div className="hidden md:block">
              <Link href="/auth/signin">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25">
                  Join the Fear
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-red-400">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-300 hover:text-red-400">
                Home
              </a>
              <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-red-400">
                Features
              </a>
              <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-red-400">
                Contact
              </a>
              <Link href="/auth/signin" className="block px-3 py-2">
                <Button className="w-full bg-red-600 hover:bg-red-700">Join the Fear</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {horrorBackgrounds.map((bg, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentBgIndex ? "opacity-70" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${bg})` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            Your Daily Dose of <span className="text-red-500 animate-pulse">Fear</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Curated Horror Videos. Every. Single. Day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105">
                <Play className="mr-2" size={20} />
                Watch Now
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white px-8 py-4 text-lg bg-transparent transition-all duration-300"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Features That <span className="text-red-500">Terrify</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience horror like never before with our carefully crafted platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-red-900/20 rounded-lg p-8 hover:border-red-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Daily Curated Terror</h3>
              <p className="text-gray-400 leading-relaxed">
                10 handpicked horror videos delivered fresh every 24 hours. No endless scrolling, just pure concentrated
                fear.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-red-900/20 rounded-lg p-8 hover:border-red-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Role-Based Access</h3>
              <p className="text-gray-400 leading-relaxed">
                Secure platform with user, admin, and superadmin roles. Quality content managed by horror enthusiasts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-red-900/20 rounded-lg p-8 hover:border-red-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Community Features</h3>
              <p className="text-gray-400 leading-relaxed">
                Like, comment, share, and save your favorite horror moments. Connect with fellow fear seekers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact the <span className="text-red-500">Darkness</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have questions? Want to join our team of horror curators? Reach out to us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-gray-400">contact@horrorhub.com</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
              <p className="text-gray-400">+1 (666) HORROR-1</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Location</h3>
              <p className="text-gray-400">The Dark Web</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-900/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold text-red-500 mb-4">Horror Hub</h3>
              <p className="text-gray-400 mb-4 max-w-md">
                Your ultimate destination for curated horror content. Experience fear like never before with our daily
                selection of terrifying videos.
              </p>
              <div className="flex space-x-4">
                <Link href="/auth/signin">
                  <Button className="bg-red-600 hover:bg-red-700">Get Started</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-red-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Videos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#contact" className="hover:text-red-400 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-red-900/20 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 Horror Hub. All rights reserved. Enter if you dare.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function Page() {
  return (
    <SessionProvider>
      <HomePage />
    </SessionProvider>
  )
}
