"use client"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/ui/Navbar"
import { motion } from "framer-motion"
import { Brain, LineChart, Target, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const steps = [
  {
    icon: Brain,
    title: "Take the Assessment",
    description: "Complete our AI-powered assessment to analyze your skills, interests, and personality traits.",
    color: "#58CC02",
    image: "/assets/images/how-it-works/assessment.png"
  },
  {
    icon: Target,
    title: "Get Personalized Recommendations",
    description: "Receive tailored career path suggestions and skill development recommendations.",
    color: "#1CB0F6",
    image: "/assets/images/how-it-works/recommendations.png"
  },
  {
    icon: LineChart,
    title: "Track Your Progress",
    description: "Monitor your growth and achievements through our interactive dashboard.",
    color: "#8A2EFF",
    image: "/assets/images/how-it-works/progress.png"
  },
  {
    icon: Users,
    title: "Connect with Mentors",
    description: "Get guidance from industry professionals who can help accelerate your career.",
    color: "#FF9600",
    image: "/assets/images/how-it-works/mentors.png"
  }
]

export default function HowItWorks() {
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
                Your Journey to{" "}
                <span className="bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
                  Career Success
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Follow our proven process to discover and achieve your career goals
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="bg-gray-50 dark:bg-[#1A1A1A]">
          <div className="container px-4 md:px-6 py-16">
            <div className="space-y-20">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''
                    }`}
                >
                  <div className="space-y-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}20` }}
                    >
                      <step.icon className="w-6 h-6" style={{ color: step.color }} />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-[#1CB0F6]">
                        Step {i + 1}
                      </span>
                      <h2 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                        {step.title}
                      </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                  <div className={`relative ${i % 2 === 1 ? 'md:order-first' : ''}`}>
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={600}
                      height={400}
                      className="rounded-xl shadow-lg"
                    />
                    <div
                      className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full"
                      style={{ backgroundColor: `${step.color}10` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white dark:bg-[#111111]">
          <div className="container px-4 md:px-6 py-16">
            <div className="text-center space-y-8 max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
                  Questions
                </span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  q: "How long does the assessment take?",
                  a: "The initial assessment typically takes 15-20 minutes to complete."
                },
                {
                  q: "How accurate are the career recommendations?",
                  a: "Our AI model has a 95% accuracy rate based on successful career transitions."
                },
                {
                  q: "Can I change my career path later?",
                  a: "Yes, you can update your preferences and receive new recommendations anytime."
                },
                {
                  q: "How do I connect with mentors?",
                  a: "After completing your assessment, you'll be matched with relevant mentors in your field."
                }
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 dark:bg-[#1A1A1A] p-6 rounded-xl"
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
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
                Ready to Begin Your Journey?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Join thousands of professionals who have transformed their careers with Saltus
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/register">
                  <Button className="bg-[#1CB0F6] hover:bg-[#1890d0] text-white px-8">
                    Start Free Assessment
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-gray-200 dark:border-[#444444] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#333333]">
                    Talk to an Expert
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