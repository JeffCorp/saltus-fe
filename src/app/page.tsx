"use client";

import { Button } from "@/components/ui/button";
import Hero from "@/components/ui/Hero";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/Navbar";
import Section from "@/components/ui/Section";
import { Rocket, Settings, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function CareerLeapLanding() {
  return (
    <div className="min-h-screen bg-gradient-pattern">
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <Hero />
          <Section variant="secondary" className="bg-black/80 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <div className="container px-4 md:px-6 relative z-10">
              <h2 className="text-3xl font-bold text-white tracking-tighter sm:text-5xl text-center mb-16">
                Our Features
              </h2>
              <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                {[
                  {
                    icon: Rocket,
                    title: "AI-Powered Career Guidance",
                    description: "Get personalized career advice based on your skills, experience, and goals.",
                    gradient: "from-[#1A4B84] to-[#00A9A5]"
                  },
                  {
                    icon: TrendingUp,
                    title: "Google Trends Integration",
                    description: "Stay ahead of the curve with real-time industry and job market trends.",
                    gradient: "from-[#00A9A5] to-[#FF6B35]"
                  },
                  {
                    icon: Settings,
                    title: "Career Growth Tools",
                    description: "Access a suite of tools for resume building, interview preparation, and skill development.",
                    gradient: "from-[#FF6B35] to-[#1A4B84]"
                  }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group relative bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{ backgroundImage: `linear-gradient(to right, ${feature.gradient})` }}
                    />
                    <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
                      <div className={`p-4 rounded-full bg-gradient-to-r ${feature.gradient}`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-white/90">
                        {feature.title}
                      </h3>
                      <p className="text-white/80 group-hover:text-white/90">
                        {feature.description}
                      </p>
                      {/* Feature-specific stats or highlights */}
                      <div className="pt-4 mt-4 border-t border-white/10 w-full">
                        <div className="flex justify-center space-x-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{index === 0 ? "98%" : index === 1 ? "24/7" : "100+"}</div>
                            <div className="text-xs text-white/60">{index === 0 ? "Accuracy" : index === 1 ? "Updates" : "Tools"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
          <Section variant="primary" className="bg-black/60">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold text-[#1A4B84] tracking-tighter sm:text-5xl text-center mb-12">
                What Our Users Say
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center space-y-4 text-center bg-white p-6 rounded-xl shadow-lg"
                  >
                    <Star className="h-10 w-10 text-[#FF6B35]" />
                    <p className="text-[#2C3E50]">
                      "Career Leap has been instrumental in my professional
                      growth. The AI-powered insights are spot-on!"
                    </p>
                    <p className="font-semibold text-[#1A4B84]">- Happy User {i}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>
          <Section variant="secondary" className="bg-black/90">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to Leap Forward?
                  </h2>
                  <p className="mx-auto max-w-[600px] text-white/80 md:text-xl">
                    Join Career Leap today and take the first step towards a
                    brighter professional future.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input
                      className="max-w-lg flex-1 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Button variant="default">Sign Up</Button>
                  </form>
                  <p className="text-xs text-white/60">
                    By signing up, you agree to our Terms & Conditions.
                  </p>
                </div>
              </div>
            </div>
          </Section>
        </main>
        <footer className="py-6 w-full px-4 md:px-6 border-t border-[#2C3E50]/10 bg-white">
          <div className="container mx-auto flex flex-col gap-2 sm:flex-row items-center">
            <p className="text-xs text-[#2C3E50]">
              © 2024 Career Leap. All rights reserved.
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link className="text-xs hover:text-[#1A4B84] transition-colors" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs hover:text-[#1A4B84] transition-colors" href="#">
                Privacy
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}
