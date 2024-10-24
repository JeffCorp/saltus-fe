"use client";

import { Button } from "@/components/ui/button";
import Hero from "@/components/ui/Hero";
import { Input } from "@/components/ui/input";
import Section from "@/components/ui/Section";
import { Rocket, Settings, Star, TrendingUp } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CareerLeapLanding() {
  const router = useRouter();



  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero />
        <Section variant="secondary">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-white tracking-tighter sm:text-5xl text-center mb-12">
              Our Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-white rounded-full">
                  <Rocket className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  AI-Powered Career Guidance
                </h3>
                <p className="text-gray-500">
                  Get personalized career advice based on your skills,
                  experience, and goals.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-white rounded-full">
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Google Trends Integration
                </h3>
                <p className="text-gray-500">
                  Stay ahead of the curve with real-time industry and job market
                  trends.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-white rounded-full">
                  <Settings className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Career Growth Tools
                </h3>
                <p className="text-gray-500">
                  Access a suite of tools for resume building, interview
                  preparation, and skill development.
                </p>
              </div>
            </div>
          </div>
        </Section>
        <Section variant="primary">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center space-y-4 text-center"
                >
                  <Star className="h-10 w-10 text-yellow-400" />
                  <p className="text-gray-500 dark:text-gray-400">
                    "Career Leap has been instrumental in my professional
                    growth. The AI-powered insights are spot-on!"
                  </p>
                  <p className="font-semibold">- Happy User {i}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
        <Section variant="secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Leap Forward?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join Career Leap today and take the first step towards a
                  brighter professional future.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our Terms & Conditions.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Career Leap. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
