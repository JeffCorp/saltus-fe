"use client"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/ui/Navbar"
import { motion } from "framer-motion"
import { ArrowRight, Brain, LineChart, Target, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const tools = [
  {
    icon: Brain,
    title: "AI Career Assessment",
    description: "Get personalized career recommendations based on your skills, interests, and personality.",
    link: "/assessment",
    image: "/assets/images/tools/assessment.png",
    color: "#58CC02"
  },
  {
    icon: LineChart,
    title: "Skill Analytics",
    description: "Track your progress and identify key areas for professional growth.",
    link: "/dashboard/skills",
    image: "/assets/images/tools/analytics.png",
    color: "#1CB0F6"
  },
  {
    icon: Target,
    title: "Goal Setting",
    description: "Set and track career milestones with our intelligent goal-setting framework.",
    link: "/dashboard/goals",
    image: "/assets/images/tools/goals.png",
    color: "#8A2EFF"
  },
  {
    icon: Users,
    title: "Mentor Matching",
    description: "Connect with industry professionals who can guide your career journey.",
    link: "/mentors",
    image: "/assets/images/tools/mentors.png",
    color: "#FF9600"
  }
]

export default function CareerTools() {
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
                Powerful Tools for Your{" "}
                <span className="bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
                  Career Growth
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Discover our suite of AI-powered tools designed to accelerate your professional development
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="bg-gray-50 dark:bg-[#1A1A1A]">
          <div className="container px-4 md:px-6 py-16">
            <div className="grid md:grid-cols-2 gap-8">
              {tools.map((tool, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative bg-white dark:bg-[#111111] p-8 rounded-xl border border-gray-200 dark:border-[#333333] hover:border-[#1CB0F6] dark:hover:border-[#1CB0F6] transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${tool.color}20` }}
                    >
                      <tool.icon
                        className="w-6 h-6"
                        style={{ color: tool.color }}
                      />
                    </div>
                    <div className="space-y-4 flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {tool.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {tool.description}
                      </p>
                      <Link href={tool.link}>
                        <Button
                          className="group/button mt-4 bg-transparent hover:bg-[#1CB0F6] text-[#1CB0F6] hover:text-white border border-[#1CB0F6]"
                        >
                          Try Now
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-6 rounded-lg overflow-hidden">
                    <Image
                      src={tool.image}
                      alt={tool.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg transition-transform group-hover:scale-105"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white dark:bg-[#111111]">
          <div className="container px-4 md:px-6 py-16">
            <div className="text-center space-y-8 max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Why Choose Our{" "}
                <span className="bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
                  Career Tools
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Our tools are designed with the latest AI technology to provide you with actionable insights
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Data-Driven Insights",
                  description: "Make informed decisions based on real-world data and industry trends"
                },
                {
                  title: "Personalized Experience",
                  description: "Get recommendations tailored to your unique career journey"
                },
                {
                  title: "Continuous Learning",
                  description: "Access resources that help you stay ahead in your field"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-gray-50 dark:bg-[#1A1A1A] p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
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
                Start Using Our Tools Today
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Join thousands of professionals who are accelerating their careers with Saltus
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/register">
                  <Button className="bg-[#1CB0F6] hover:bg-[#1890d0] text-white px-8">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-gray-200 dark:border-[#444444] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#333333]">
                    Schedule Demo
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