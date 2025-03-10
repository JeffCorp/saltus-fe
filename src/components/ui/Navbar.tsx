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
  const isDashboard = pathname.includes('/dashboard');

  return (
    <header className={`fixed w-full top-0 z-50 px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm transition-colors
      ${isDashboard ? 'bg-[#1A1A1A] border-b border-[#333333]' : 'bg-white/5'}`}>
      <Link
        className="flex items-center justify-center text-white group"
        href="/"
        onClick={() => {
          router.push("/");
          setIsOpen(false);
        }}
      >
        {/* <img src="/logo.png" alt="Saltus" className="h-8 w-auto mr-2" /> */}
        <Rocket className="h-6 w-6 mr-2 text-[#1CB0F6]" />
        <span className="font-bold text-lg">Saltus</span>
      </Link>

      {/* web view */}
      <nav className="ml-auto hidden lg:flex gap-8 items-center">
        <Link
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          href="/about"
        >
          About Us
        </Link>
        <div className="relative group">
          <Link
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            href="#"
          >
            Career Tools
          </Link>
        </div>
        <Link
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          href="#"
        >
          How It Works
        </Link>
        <Link
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          href="#"
        >
          Support
        </Link>
        {status === "authenticated" ? (
          <div className="ml-8 flex gap-4">
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="border-2 border-[#1CB0F6] text-[#1CB0F6] hover:bg-[#1CB0F6]/10"
            >
              Dashboard
            </Button>
            <Button
              onClick={() => signOut()}
              variant="default"
              className="bg-[#1CB0F6] hover:bg-[#1890d0]"
            >
              Logout
            </Button>
          </div>
        ) : status === "unauthenticated" && !isAuthPage ? (
          <div className="ml-8">
            <Button
              onClick={() => router.push("/contact")}
              variant="default"
              className="bg-[#1CB0F6] hover:bg-[#1890d0]"
            >
              Schedule a Meeting
            </Button>
          </div>
        ) : null}
      </nav>

      <button onClick={toggleMenu} className="ml-auto lg:hidden text-white hover:text-[#1CB0F6] transition-colors">
        {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {/* mobile view */}
      {isOpen && (
        <nav className="flex lg:hidden flex-col fixed right-0 top-16 items-start w-full h-screen bg-[#1A1A1A] text-white z-50">
          <button
            className="p-8 hover:bg-[#1CB0F6]/10 w-full text-left transition-colors"
            onClick={() => handleNav("/about")}
          >
            About Us
          </button>
          <button
            className="p-8 hover:bg-[#1CB0F6]/10 w-full text-left transition-colors"
            onClick={() => handleNav("/career-tools")}
          >
            Career Tools
          </button>
          <button
            className="p-8 hover:bg-[#1CB0F6]/10 w-full text-left transition-colors"
            onClick={() => handleNav("/how-it-works")}
          >
            How It Works
          </button>
          <button
            className="p-8 hover:bg-[#1CB0F6]/10 w-full text-left transition-colors"
            onClick={() => handleNav("/support")}
          >
            Support
          </button>
          {status === "authenticated" ? (
            <>
              <button
                onClick={() => handleNav("/dashboard")}
                className="p-8 hover:bg-[#1CB0F6]/10 w-full text-left transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => signOut()}
                className="p-8 bg-[#1CB0F6] hover:bg-[#1890d0] w-full text-left transition-colors"
              >
                Logout
              </button>
            </>
          ) : status === "unauthenticated" && !isAuthPage ? (
            <button
              onClick={() => handleNav("/contact")}
              className="p-8 bg-[#1CB0F6] hover:bg-[#1890d0] w-full text-left transition-colors"
            >
              Schedule a Meeting
            </button>
          ) : null}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
