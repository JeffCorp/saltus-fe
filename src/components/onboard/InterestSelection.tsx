'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useTTS } from "@/services/useTTS";
import Image from "next/image";

interface InterestSelectionProps {
  onSelect: (interest: 'tech' | 'unsure') => void;
}

export default function InterestSelection({ onSelect }: InterestSelectionProps) {
  const { speak, cancel } = useTTS();

  // useEffect(() => {
  //   speak("What brings you to Saltus? You can choose between pursuing a career in tech, or exploring tech if you're not sure where to start.");
  //   return () => cancel();
  // }, [speak, cancel]);

  return (
    <Card className="bg-[#1A0B33] border-[#333333] max-w-6xl mx-auto">
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
          What brings you to Saltus?
        </CardTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Illustration */}
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-lg flex items-center justify-center">
              <Image
                src="/assets/images/career.svg"
                alt="Career Choice"
                width={256}
                height={256}
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={() => onSelect('tech')}
                // onMouseEnter={() => speak("I want to pursue a career in tech")}
                // onMouseLeave={() => cancel()}
                className="w-full !border-[#8A2EFF] hover:!border-[#7325D4] text-white p-6 text-left"
              >
                I want to pursue a career in tech
              </Button>
              <Button
                variant="outline"
                onClick={() => onSelect('unsure')}
                // onMouseEnter={() => speak("I'm interested in tech but not sure where to start")}
                // onMouseLeave={() => cancel()}
                className="w-full !border-[#8A2EFF] hover:!border-[#7325D4] text-white p-6 text-left"
              >
                I'm interested in tech but not sure where to start
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 