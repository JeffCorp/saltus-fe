"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/ui/Navbar"
import { motion } from "framer-motion"
import { BookOpen, HelpCircle, LifeBuoy, Mail, MessageCircle, Phone, Search } from "lucide-react"
import Link from "next/link"

const supportCategories = [
  {
    icon: HelpCircle,
    title: "Getting Started",
    description: "New to Saltus? Learn the basics and get started quickly.",
    color: "#58CC02",
    link: "/docs/getting-started"
  },
  {
    icon: BookOpen,
    title: "User Guides",
    description: "Detailed guides for using all Saltus features.",
    color: "#1CB0F6",
    link: "/docs/guides"
  },
  {
    icon: MessageCircle,
    title: "FAQ",
    description: "Find answers to commonly asked questions.",
    color: "#8A2EFF",
    link: "/docs/faq"
  },
  {
    icon: LifeBuoy,
    title: "Technical Support",
    description: "Get help with technical issues and troubleshooting.",
    color: "#FF9600",
    link: "/docs/technical-support"
  }
]

export default function Support() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111]">
      <Navbar />
      <main className="pt-24 flex flex-col min-h-screen items-center">
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
                How Can We{" "}
                <span className="bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
                  Help You?
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Find answers, documentation, and support to help you succeed with Saltus
              </p>
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search for help articles..."
                  className="w-full pl-12 pr-4 py-6 bg-gray-50 dark:bg-[#1A1A1A] border-gray-200 dark:border-[#333333] rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Support Categories */}
        <section className="bg-gray-50 dark:bg-[#1A1A1A] w-full flex flex-col min-h-screen items-center">
          <div className="container px-4 md:px-6 py-16">
            <div className="grid md:grid-cols-2 gap-8">
              {supportCategories.map((category, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white dark:bg-[#111111] p-8 rounded-xl border border-gray-200 dark:border-[#333333] hover:border-[#1CB0F6] dark:hover:border-[#1CB0F6] transition-all duration-300"
                >
                  <Link href={category.link} className="block">
                    <div className="flex items-start gap-6">
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <category.icon
                          className="w-6 h-6"
                          style={{ color: category.color }}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                          {category.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="bg-white dark:bg-[#111111] w-full flex flex-col min-h-screen items-center">
          <div className="container px-4 md:px-6 py-16">
            <div className="text-center space-y-8 max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Need More{" "}
                <span className="bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
                  Help?
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Our support team is here to help you succeed
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: MessageCircle,
                  title: "Live Chat",
                  description: "Chat with our support team",
                  action: "Start Chat",
                  link: "#chat"
                },
                {
                  icon: Mail,
                  title: "Email Support",
                  description: "Get help via email",
                  action: "Send Email",
                  link: "mailto:support@saltus.com"
                },
                {
                  icon: Phone,
                  title: "Phone Support",
                  description: "Talk to a representative",
                  action: "Call Now",
                  link: "tel:+1234567890"
                }
              ].map((option, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 dark:bg-[#1A1A1A] p-6 rounded-xl text-center"
                >
                  <option.icon className="w-8 h-8 mx-auto mb-4 text-[#1CB0F6]" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {option.description}
                  </p>
                  <Link href={option.link}>
                    <Button className="bg-[#1CB0F6] hover:bg-[#1890d0] text-white w-full">
                      {option.action}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Submit Ticket */}
        <section className="bg-gray-50 dark:bg-[#1A1A1A] w-full flex flex-col min-h-screen items-center">
          <div className="container px-4 md:px-6 py-16">
            <div className="max-w-2xl mx-auto">
              <div className="text-center space-y-8 mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Submit a Support Ticket
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Can't find what you're looking for? Submit a ticket and we'll get back to you.
                </p>
              </div>
              <form className="space-y-6">
                <div>
                  <Input
                    placeholder="Your Name"
                    className="w-full bg-white dark:bg-[#111111] border-gray-200 dark:border-[#333333]"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-white dark:bg-[#111111] border-gray-200 dark:border-[#333333]"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Describe your issue"
                    className="w-full h-32 px-4 py-3 rounded-lg bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#333333] focus:outline-none focus:ring-2 focus:ring-[#1CB0F6] text-gray-900 dark:text-white"
                  />
                </div>
                <Button className="w-full bg-[#1CB0F6] hover:bg-[#1890d0] text-white">
                  Submit Ticket
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 