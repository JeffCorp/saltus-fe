"use client"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/ui/Navbar"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "₦0",
    description: "Perfect for exploring career possibilities",
    features: [
      "Basic career assessment",
      "Career path suggestions",
      "Limited skill tracking",
      "Basic learning resources",
      "Community access"
    ],
    cta: "Get Started",
    popular: false,
    color: "#58CC02"
  },
  {
    name: "Pro",
    price: "₦15,000",
    period: "/month",
    description: "Ideal for serious career development",
    features: [
      "Advanced career assessment",
      "Personalized roadmap",
      "Comprehensive skill tracking",
      "Premium learning resources",
      "Priority mentor matching",
      "Progress analytics",
      "1-on-1 career coaching (2hrs/month)",
      "Industry insights reports"
    ],
    cta: "Start Pro Plan",
    popular: true,
    color: "#1CB0F6"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations and teams",
    features: [
      "Everything in Pro plan",
      "Bulk user management",
      "Team analytics dashboard",
      "Custom integration options",
      "Dedicated account manager",
      "Custom training modules",
      "API access",
      "Priority 24/7 support"
    ],
    cta: "Contact Sales",
    popular: false,
    color: "#8A2EFF"
  }
]

export default function Pricing() {
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
                Simple, Transparent{" "}
                <span className="bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
                  Pricing
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Choose the perfect plan for your career journey
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Grid */}
        <section className="bg-gray-50 dark:bg-[#1A1A1A] w-full flex flex-col min-h-screen items-center">
          <div className="container px-4 md:px-6 py-16">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative bg-white dark:bg-[#111111] p-8 rounded-xl border-2 ${plan.popular
                    ? 'border-[#1CB0F6] shadow-lg shadow-[#1CB0F6]/10'
                    : 'border-gray-200 dark:border-[#333333]'
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#1CB0F6] text-white px-3 py-1 rounded-full text-sm">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-gray-600 dark:text-gray-400">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {plan.description}
                    </p>
                  </div>
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <Check className="w-5 h-5" style={{ color: plan.color }} />
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link href={plan.name === "Enterprise" ? "/contact" : "/register"}>
                    <Button
                      className={`w-full ${plan.popular
                        ? 'bg-[#1CB0F6] hover:bg-[#1890d0] text-white'
                        : 'bg-transparent hover:bg-gray-50 dark:hover:bg-[#222222] border-2 border-gray-200 dark:border-[#333333] text-gray-900 dark:text-white'
                        }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white dark:bg-[#111111] w-full flex flex-col min-h-screen items-center">
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
                  q: "Can I switch plans later?",
                  a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect in the next billing cycle."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept bank transfers, cards, and popular Nigerian payment methods like Paystack."
                },
                {
                  q: "Is there a refund policy?",
                  a: "Yes, we offer a 7-day money-back guarantee if you're not satisfied with our service."
                },
                {
                  q: "Do you offer student discounts?",
                  a: "Yes, students can get 30% off the Pro plan with a valid student ID."
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
        <section className="bg-gray-50 dark:bg-[#1A1A1A] w-full flex flex-col min-h-screen items-center">
          <div className="container px-4 md:px-6 py-16">
            <div className="text-center space-y-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Ready to Start Your Journey?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Join thousands of professionals who are transforming their careers with Saltus
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/register">
                  <Button className="bg-[#1CB0F6] hover:bg-[#1890d0] text-white px-8">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-gray-200 dark:border-[#444444] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#333333]">
                    Talk to Sales
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