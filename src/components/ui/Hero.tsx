"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Hero() {
  const router = useRouter()
  const { data: session } = useSession()

  const handleGetStarted = () => {
    if (session) {
      router.push("/onboard")
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="relative min-h-[100vh] flex items-center bg-[#111111] py-16">
      {/* Background effects can be removed or simplified */}

      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              Unlock Your Potential With{" "}
              <span className="bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
                Saltus
              </span>
              <br />
              Navigate Your Career Path
            </h1>

            <p className="text-gray-400 text-lg">
              Our AI driven platform assesses your inclinations and personality traits to
              suggest career paths tailored to your unique strengths.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                className="bg-[#1CB0F6] hover:bg-[#1890d0] text-white px-6 py-2"
                onClick={handleGetStarted}
              >
                Join Us Now
              </Button>
              <Button
                variant="outline"
                className="border-[#444444] text-white hover:bg-[#333333]"
                onClick={() => router.push("/about")}
              >
                Discover More →
              </Button>
            </div>

            {/* Testimonials */}
            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-4 bg-[#1A1A1A] p-4 rounded-lg border border-[#333333]">
                <div className="w-12 h-12 rounded-full bg-gray-600" /> {/* Placeholder for avatar */}
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-white font-semibold">Emily Smith</span>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#FFD700]">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">
                    "Saltus has transformed my career journey. The tailored suggestions based on my
                    personality have been incredibly insightful."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Add your dashboard/UI images here */}
            <div className="relative">
              <Image
                src="/assets/images/dashboard-preview.png"
                alt="Saltus Dashboard"
                className="rounded-lg shadow-2xl object-cover w-full h-full"
                width={500}
                height={500}
              />
              <div className="absolute -top-4 -left-4 bg-[#FF4B4B] text-white px-4 py-1 rounded-full">
                Track
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#FFD700] text-white px-4 py-1 rounded-full">
                Empower
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 