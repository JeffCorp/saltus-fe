"use client";

import { MenuIcon, Rocket, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./button";

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, status } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const handleNav = (path: string) => {
    toggleMenu();
    router.push(path);
  };

  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <header className="fixed w-full top-0 z-50 px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm">
      <Link
        className="flex items-center justify-center text-white"
        href="/"
        onClick={() => {
          router.push("/");
          setIsOpen(false);
        }}
      >
        <Rocket className="h-6 w-6 mr-2 text-[#00A9A5]" />
        <span className="font-bold text-lg">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </span>
      </Link>

      {/* web view */}
      <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6 items-center">
        <Link
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors invert"
          href="#"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors invert"
          href="#"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors invert"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors invert"
          href="#"
        >
          Contact
        </Link>
        {status === "authenticated" ? (
          <div className="ml-20 flex gap-4">
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="text-white border-2 border-white hover:bg-white/10 invert"
            >
              Dashboard
            </Button>
            <Button
              onClick={() => signOut()}
              variant="default"
              className="bg-[#8A2EFF] hover:bg-[#7325D4] invert"
            >
              Logout
            </Button>
          </div>
        ) : status === "unauthenticated" && !isAuthPage ? (
          <div className="ml-20 flex gap-4">
            <Button
              onClick={() => router.push("/login")}
              variant="default"
              className="bg-[#8A2EFF] hover:bg-[#7325D4] invert"
            >
              Login
            </Button>
            <Button
              onClick={() => router.push("/register")}
              variant="outline"
              className="text-white border-2 border-white hover:bg-white/10 invert"
            >
              Register
            </Button>
          </div>
        ) : null}
      </nav>

      <button onClick={toggleMenu} className="ml-auto lg:hidden text-white">
        {isOpen ? <X /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {/* mobile view */}
      {isOpen && (
        <nav className="flex lg:hidden flex-col fixed right-0 top-16 items-start w-full h-screen bg-black text-white z-50">
          <button
            className="p-8 hover:bg-[#1A4B84] w-full text-left transition-colors"
            onClick={() => handleNav("/features")}
          >
            Features
          </button>
          <button
            className="p-8 hover:bg-[#1A4B84] w-full text-left transition-colors"
            onClick={() => handleNav("/pricing")}
          >
            Pricing
          </button>
          <button
            className="p-8 hover:bg-[#1A4B84] w-full text-left transition-colors"
            onClick={() => handleNav("/about")}
          >
            About
          </button>
          <button
            className="p-8 hover:bg-[#1A4B84] w-full text-left transition-colors"
            onClick={() => handleNav("/contact")}
          >
            Contact
          </button>
          {status === "authenticated" ? (
            <>
              <button
                onClick={() => handleNav("/dashboard")}
                className="p-8 hover:bg-[#1A4B84] w-full text-left transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => signOut()}
                className="p-8 bg-[#00A9A5] hover:bg-[#008c89] w-full text-left transition-colors"
              >
                Logout
              </button>
            </>
          ) : status === "unauthenticated" && !isAuthPage ? (
            <>
              <button
                onClick={() => handleNav("/login")}
                className="p-8 bg-[#00A9A5] hover:bg-[#008c89] w-full text-left transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => handleNav("/register")}
                className="p-8 hover:bg-[#1A4B84] w-full text-left transition-colors"
              >
                Register
              </button>
            </>
          ) : null}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
