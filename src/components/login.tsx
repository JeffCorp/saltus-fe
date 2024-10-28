"use client";

import image1 from "@/assets/images/image1.jpg";
import image2 from "@/assets/images/image2.jpg";
import image3 from "@/assets/images/image3.jpg";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { Rocket } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
        console.log(result);
      } else {
        setIsLoading(false);
        router.push(session?.user.isOnboarded ? '/dashboard' : '/onboard');
      }
    } catch (err) {
      console.error("Sign in error:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex max-h-[90vh]">
      {/* Left side - Carousel */}
      <div className="w-1/2 bg-gray-200 h-[100%]">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
          <div className="w-[100%] h-[calc(100vh-3.5rem)]">
            <Image
              src={image1}
              alt="Login Image 1"
              layout="fill"
              objectFit="cover"
              width={0}
              height={0}
            />
            <p className="legend">Accelerate Your Career with AI</p>
          </div>
          <div className="w-[100%] h-[calc(100vh-3.5rem)]">
            <Image
              src={image2}
              alt="Login Image 2"
              layout="fill"
              objectFit="cover"
              width={0}
              height={0}
            />
            <p className="legend">Connect with Industry Mentors</p>
          </div>
          <div className="w-[100%] h-[calc(100vh-3.5rem)]">
            <Image
              src={image3}
              alt="Login Image 3"
              // className="w-full h-full object-fill object-cover"
              layout="fill"
              objectFit="cover"
              width={0}
              height={0}
            />
            <p className="legend">Personalized Career Paths</p>
          </div>
        </Carousel>
      </div>

      {/* Right side - Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="flex flex-col items-center">
            <div className="flex gap-2 items-center">
              <Rocket className="text-indigo-600" />
              <h2 className="text-xl font-extrabold text-indigo-600">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </h2>
            </div>
            <p className="mt-10 text-3xl font-extrabold text-gray-900">
              Welcome Back!
            </p>
            <h3 className="text-sm text-gray-600 mt-2">
              Please enter your details
            </h3>
          </div>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md space-y-2">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="peer appearance-none relative block w-full px-3 py-4 border-b-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-4 border-b-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Box>
              <button
                type="submit"
                className="group flex mt-12 items-center gap-2 relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
                {isLoading && <Spinner size="sm" />}
              </button>
            </Box>
          </form>
          <div className="flex justify-center gap-1">
            <Text color="gray.500">Don't have an account?</Text>
            <Link className="text-blue-500" href="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
