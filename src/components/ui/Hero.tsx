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
<<<<<<< Updated upstream
          </div>
          <div className="space-x-4">
            <Button className="bg-black text-white" onClick={handleGetStarted} variant="default">
              Get Started
            </Button>
            <Button onClick={() => router.push("/about")} className="border-black" variant="outline">Learn More</Button>
          </div>
=======

            <div className="flex flex-wrap gap-4">
              <Button
                className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white px-6 py-2"
                onClick={handleGetStarted}
              >
                Join Us Now
              </Button>
              <Button
                variant="outline"
                className="border-gray-200 dark:border-[#444444] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#333333]"
                onClick={() => router.push("/about")}
              >
                Discover More →
              </Button>
            </div>

            {/* Testimonials */}
            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#1A1A1A] p-4 rounded-lg border border-gray-200 dark:border-[#333333]">
                <div className="w-[100px] h-[70px] rounded-full bg-gray-200 dark:bg-gray-600">
                  <Image src="/assets/images/jeff.jpg" className="rounded-full object-cover w-full h-full" alt="Profile" width={50} height={50} />
                </div>
                <div>
                  <div className="flex items-center gap-1 flex-[2]">
                    <span className="text-gray-900 dark:text-white font-semibold">Jeffery Patrick</span>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#FFD700]">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    "Saltus has transformed my career journey. The tailored suggestions based on my
                    personality have been incredibly insightful."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <Image
                src="/assets/images/dashboard-preview.png"
                alt="Saltus Dashboard"
                className="rounded-lg shadow-xl object-cover w-full h-full"
                width={500}
                height={500}
                priority
              />
              {/* <DotLottieReact
                src="https://lottie.host/1cb62899-93a2-4f64-bc9a-fb32f810712b/9OdnpO0Vcc.lottie"
                width="50vw"
                loop
                autoplay
              /> */}

              <div className="absolute -top-4 -left-4 bg-[#FF4B4B] text-white px-4 py-1 rounded-full">
                Track
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#FFD700] text-black px-4 py-1 rounded-full">
                Empower
              </div>
            </div>
          </motion.div>
>>>>>>> Stashed changes
        </div>
      </div>
    </Section>
  );
};

export default Hero;
