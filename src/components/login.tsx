"use client";

import image1 from "@/assets/images/image1.jpg";
import image2 from "@/assets/images/image2.jpg";
import image3 from "@/assets/images/image3.jpg";
import { Button } from "@/components/ui/button";
import { Loader2, Rocket } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setIsLoading(false);
        setError(result.error);
      } else {
        setIsLoading(false);
        console.log("session", session)
        // router.push(session?.user.isOnboarded ? '/dashboard' : '/onboard');
      }
    } catch (err) {
      console.error("Sign in error:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Carousel */}
      <div className="w-1/2 bg-gray-50 dark:bg-[#1A1A1A] hidden md:block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#58CC02]/20 via-[#1CB0F6]/20 to-[#8A2EFF]/20 z-10" />
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          interval={5000}
          className="h-full"
        >
          <div className="h-screen relative">
            <Image
              src={image1}
              alt="AI Career Guidance"
              className="object-cover"
              fill
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-2xl font-bold mb-2">Accelerate Your Career with AI</h3>
              <p>Get personalized career guidance powered by artificial intelligence</p>
            </div>
          </div>
          <div className="h-screen relative">
            <Image
              src={image2}
              alt="Login Image 2"
              layout="fill"
              objectFit="cover"
              width={0}
              height={0}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-2xl font-bold mb-2">Connect with Industry Mentors</h3>
              <p>Connect with industry mentors for guidance and support</p>
            </div>
          </div>
          <div className="h-screen relative">
            <Image
              src={image3}
              alt="Login Image 3"
              layout="fill"
              objectFit="cover"
              width={0}
              height={0}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-2xl font-bold mb-2">Personalized Career Paths</h3>
              <p>Create personalized career paths tailored to your interests and goals</p>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white dark:bg-[#111111] px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-8">
              <Rocket className="h-8 w-8 text-[#1CB0F6]" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Please enter your details to sign in
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-300 dark:border-[#333333] rounded-lg focus:ring-2 focus:ring-[#1CB0F6] focus:border-transparent transition-colors text-gray-900 dark:text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-300 dark:border-[#333333] rounded-lg focus:ring-2 focus:ring-[#1CB0F6] focus:border-transparent transition-colors text-gray-900 dark:text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1CB0F6] hover:bg-[#1890d0] text-white font-medium py-2 px-4 rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <p className="text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#1CB0F6] hover:text-[#1890d0] font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
