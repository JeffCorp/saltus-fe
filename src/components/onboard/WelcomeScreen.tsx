'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useTTS } from "@/services/useTTS";
import Image from "next/image";
import { useEffect } from "react";

interface WelcomeScreenProps {
  userName: string;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function WelcomeScreen({
  userName,
  onNext,
  currentStep,
  totalSteps
}: WelcomeScreenProps) {
  const { speak, cancel } = useTTS();

  useEffect(() => {
    speak(`Hi, welcome to Saltus.`);
    return () => cancel();
  }, [userName, speak, cancel]);

  return (
    <Card className="bg-[#333333] border-[#333333] max-w-6xl mx-auto">
      <CardContent className="py-8">
        {/* Logo Section */}
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-[#8A2EFF] flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
        </div>

        <CardTitle className="text-3xl font-bold text-white text-center mb-12">
          Welcome To Saltus!
        </CardTitle>

        {/* Split Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Illustration */}
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-lg flex items-center justify-center">
              {/* Placeholder for illustration - you can replace this with your actual illustration */}
              <Image
                src="/assets/images/hello.svg"
                alt="Welcome"
                width={256}
                height={256}
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">
              Easily Manage Your Career Path
            </h2>
            <p className="text-gray-400">
              Get started with Saltus, your personal career coach. We'll help you learn, practice,
              and prepare for real-world jobs. Through hands-on exercises and
              guided learning, you'll build the skills needed to succeed in the industry.
            </p>
            <div className="space-y-4">
              <div>
                <Button
                  onClick={onNext}
                  className="w-auto bg-[#8A2EFF] hover:bg-[#7325D4] text-white"
                >
                  Next
                </Button>
              </div>

              <div className="flex justify-center gap-2">
                {[...Array(totalSteps)].map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentStep - 1 ? 'bg-[#8A2EFF]' : 'bg-[#333333]'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 