"use client";

import { Button } from "@/components/ui/button";
import Hero from "@/components/ui/Hero";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/Navbar";
import Section from "@/components/ui/Section";
import { motion } from "framer-motion";
import { Facebook, Instagram, Rocket, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1" role="main">
          <Hero />

          {/* Discover Your Path Section */}
          <Section className="bg-[#1A1A1A] relative overflow-hidden">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="container px-4 md:px-6"
              aria-label="Career path discovery section"
            >
              <div className="grid gap-16 lg:grid-cols-2 items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-6">
                    Discover Your Path{" "}
                    <span className="bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
                      to Success with Saltus
                    </span>
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Uncover personalized career recommendations tailored to your unique traits and preferences. Our AI technology empowers you to navigate your career journey effortlessly.
                  </p>
                </div>
                <div className="relative">
                  {/* Add decorative elements here */}
                  <Image
                    src="/assets/images/career-path.png"
                    alt="Saltus Dashboard"
                    className="rounded-lg shadow-2xl object-cover w-full h-full"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </motion.div>
          </Section>

          {/* Features Grid Section */}
          <Section className="bg-[#111111]">
            <div className="container px-4 md:px-6">
              <div className="grid gap-8 md:grid-cols-3" role="list">
                <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#333333]" role="listitem">
                  <h3 className="text-xl font-bold mb-4">
                    Personalized career recommendations{" "}
                    <span className="text-[#58CC02]">tailored for you</span>
                  </h3>
                  <p className="text-gray-400">
                    Saltus analyzes your inclinations to provide career paths that align with your strengths, helping you decide with confidence.
                  </p>
                </div>

                <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#333333]" role="listitem">
                  <h3 className="text-xl font-bold mb-4">
                    Intuitive dashboard for{" "}
                    <span className="text-[#1CB0F6]">tracking your journey</span>
                  </h3>
                  <p className="text-gray-400">
                    Our dashboard integrates tools and insights to help you manage your development and stay on top of your career goals.
                  </p>
                </div>

                <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#333333]" role="listitem">
                  <h3 className="text-xl font-bold mb-4">
                    Join a supportive community to{" "}
                    <span className="text-[#8A2EFF]">share insights</span>
                  </h3>
                  <p className="text-gray-400">
                    Connect with like-minded individuals on similar career paths as you share strategies and support each other's journey.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* Statistics Section */}
          <Section className="bg-[#1A1A1A]">
            <div className="container px-4 md:px-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8" role="list" aria-label="Achievement statistics">
                <div className="bg-[#1CB0F6] p-6 rounded-xl text-center" role="listitem">
                  <div className="text-4xl font-bold text-white">1,500+</div>
                  <div className="text-white">Career Paths Explored</div>
                </div>
                <div className="bg-[#1CB0F6] p-6 rounded-xl text-center" role="listitem">
                  <div className="text-4xl font-bold text-white">150+</div>
                  <div className="text-white">Users on Their Journey</div>
                </div>
                <div className="bg-[#1CB0F6] p-6 rounded-xl text-center" role="listitem">
                  <div className="text-4xl font-bold text-white">25+</div>
                  <div className="text-white">Countries Represented</div>
                </div>
              </div>
            </div>
          </Section>

          {/* Transform Your Career Section */}
          <Section className="bg-[#111111]">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12">
                Transform Your Career with Saltus
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-[#1A1A1A] p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Stay Organized with Our Dashboard</h3>
                  <p className="text-gray-400">
                    Experience our user-friendly dashboard designed to keep you organized and focused on your career goals.
                  </p>
                </div>
                <div className="bg-[#1A1A1A] p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Career Insights at Your Fingertips</h3>
                  <p className="text-gray-400">
                    With every step monitored, you'll have the tools you need to navigate your professional development effectively.
                  </p>
                </div>
                <div className="bg-[#1A1A1A] p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Join a Thriving Community</h3>
                  <p className="text-gray-400">
                    Engage with a vibrant community of driven individuals. Share insights, seek advice, and find motivation.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* Contact Form Section */}
          <Section className="bg-[#1A1A1A]">
            <div className="container px-4 md:px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6" id="contact-form">
                    Unlock Your Career Potential with Saltus
                  </h2>
                  <form className="space-y-4" aria-labelledby="contact-form">
                    <div>
                      <label htmlFor="name" className="sr-only">Your Name</label>
                      <Input
                        id="name"
                        placeholder="Your Name"
                        className="bg-[#222222] border-[#444444]"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">Email</label>
                      <Input
                        id="email"
                        placeholder="Email"
                        type="email"
                        className="bg-[#222222] border-[#444444]"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="sr-only">Your Message</label>
                      <textarea
                        id="message"
                        placeholder="Your Message"
                        className="w-full h-32 bg-[#222222] border-[#444444] rounded-md p-3"
                        aria-required="true"
                      />
                    </div>
                    <Button className="bg-[#1CB0F6] hover:bg-[#1890d0] text-white">
                      Send Your Inquiry
                    </Button>
                  </form>
                </div>
                <div className="relative">
                  {/* Add illustration or image here */}
                </div>
              </div>
            </div>
          </Section>
        </main>

        <footer className="py-6 w-full border-t border-[#333333] bg-[#111111]" role="contentinfo">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Rocket className="h-8" aria-hidden="true" />
                <span className="text-white">Saltus</span>
              </div>
              <nav aria-label="Footer navigation">
                <Link href="/about" className="text-gray-400 hover:text-white">About Us</Link>
                <Link href="/assessment" className="text-gray-400 hover:text-white">Career Assessment</Link>
                <Link href="/dashboard" className="text-gray-400 hover:text-white">Career Dashboard</Link>
                <Link href="/contact" className="text-gray-400 hover:text-white">Get in Touch</Link>
                <Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
                <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              </nav>
              <div className="flex gap-4" aria-label="Social media links">
                <Link href="#" className="text-gray-400 hover:text-white" aria-label="Follow us on Instagram">
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white" aria-label="Follow us on Facebook">
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white" aria-label="Follow us on Twitter">
                  <Twitter className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="mt-6 text-center text-gray-400 text-sm">
              © copyright saltus.com {new Date().getFullYear()}. All Rights Reserved
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
