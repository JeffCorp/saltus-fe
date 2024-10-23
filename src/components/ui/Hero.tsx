import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Typewriter } from 'react-simple-typewriter';
import { Button } from "./button";
import Section from "./Section";

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
    <Section classname="h-[90vh]" variant="primary">
      <div className="container md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Accelerate Your Career with <br />
              <span className="text-indigo-600">
                <Typewriter
                  words={['AI-Powered Insights', 'AI-Powered Guidance', 'AI-Powered Skills']}
                  loop={5}
                  cursor
                  cursorStyle='_'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                  onLoopDone={() => { }}
                  onType={() => { }}
                /></span>
            </h1>
            <p className="mx-auto max-w-[90vw] md:max-w-[50vw] text-gray-400 md:text-md">
              Career Leap uses cutting-edge AI, Google Trends, and powerful
              tools to guide you towards your dream job and continuous
              professional growth.
            </p>
          </div>
          <div className="space-x-4">
            <Button className="bg-black text-white" onClick={handleGetStarted} variant="default">
              Get Started
            </Button>
            <Button onClick={() => router.push("/about")} className="border-black" variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
