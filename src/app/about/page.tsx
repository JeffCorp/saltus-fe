"use client"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/ui/Navbar"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111]">
      <Navbar />
      <main className="pt-24 flex flex-col min-h-screen items-center ">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container px-4 md:px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8 max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
                Empowering Careers Through{" "}
                <span className="bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
                  AI Innovation
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                We're on a mission to revolutionize career development by making personalized guidance accessible to everyone.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-gray-50 dark:bg-[#1A1A1A]">
          <div className="container px-4 md:px-6 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  At Saltus, we believe everyone deserves access to high-quality career guidance.
                  By combining AI technology with human expertise, we're creating a future where
                  career decisions are informed, personalized, and data-driven.
                </p>
                <div className="space-y-4">
                  {[
                    "Personalized career recommendations",
                    "Real-time industry insights",
                    "AI-powered skill assessments",
                    "Expert-curated learning paths"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#58CC02]" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <Image
                  src="/assets/images/mission.png"
                  alt="Our Mission"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white dark:bg-[#111111]">
          <div className="container px-4 md:px-6 py-16">
            <div className="text-center space-y-8 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Meet Our{" "}
                <span className="bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
                  Team
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                A diverse group of experts passionate about transforming career development
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  name: "Alex Chen",
                  role: "CEO & Founder",
                  image: "/assets/images/team/alex.png"
                },
                {
                  name: "Sarah Johnson",
                  role: "Head of AI",
                  image: "/assets/images/team/sarah.png"
                },
                {
                  name: "Michael Lee",
                  role: "Career Expert",
                  image: "/assets/images/team/michael.png"
                }
              ].map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-gray-50 dark:bg-[#1A1A1A] p-6 rounded-xl text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 dark:bg-[#1A1A1A]">
          <div className="container px-4 md:px-6 py-16">
            <div className="text-center space-y-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Ready to Start Your Journey?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Join thousands of professionals who are already using Saltus to navigate their careers.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/register">
                  <Button className="bg-[#1CB0F6] hover:bg-[#1890d0] text-white px-8">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-gray-200 dark:border-[#444444] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#333333]">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
