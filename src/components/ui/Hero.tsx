import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { HeroShapes } from "./HeroShapes";

const Hero: React.FC = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const handleGetStarted = () => {
    if (session) {
      router.push("/onboard");
    } else {
      router.push("/login");
    }
  };
  return (
    <div className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      <HeroShapes />
      <div className="relative container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
          Your AI-Powered
          <span className="bg-gradient-to-r from-[#8A2EFF] via-[#9F54FF] to-white text-transparent bg-clip-text">
            {" "}Career Guide
          </span>
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
          Navigate your career path with confidence using AI-driven insights,
          personalized recommendations, and real-time industry trends.
        </p>
        <div className="space-x-4">
          <Button
            variant="default"
            className="bg-[#8A2EFF] hover:bg-[#7325D4] shadow-lg"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            className="text-[#8A2EFF] border-2 border-[#8A2EFF] hover:bg-[#8A2EFF]/10 dark:text-white dark:border-white dark:hover:bg-white/10"
            onClick={() => router.push("/about")}
          >
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
          {[
            { number: "10k+", label: "Active Users" },
            { number: "95%", label: "Success Rate" },
            { number: "24/7", label: "AI Support" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <span className="text-3xl font-bold text-[#8A2EFF]">{stat.number}</span>
              <span className="text-sm text-gray-300">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
