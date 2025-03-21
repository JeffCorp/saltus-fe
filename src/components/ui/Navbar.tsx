"use client";

import { useTheme } from "@/components/theme-provider";
import { MenuIcon, Moon, Rocket, Sun, X } from "lucide-react";
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
  const { theme, setTheme } = useTheme();

  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    toggleMenu();
    router.push(path);
  };

  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isDashboard = pathname.includes('/dashboard');

  return (
    <header className={`fixed w-full top-0 z-50 px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm transition-colors
      ${isDashboard ? 'bg-[#1A1A1A] border-b border-[#333333]' : 'bg-white/5 dark:bg-black/5'}`}>
      <Link
        className="flex items-center justify-center text-white group"
        href="/"
        onClick={handleNavigation('/')}
      >
        {/* <img src="/logo.png" alt="Saltus" className="h-8 w-auto mr-2" /> */}
        <Rocket className="h-6 w-6 mr-2 text-[#8A2EFF]" />
        <span className="font-bold text-lg text-[#2C3E50] dark:text-white">Saltus</span>
      </Link>

      {/* web view */}
      <nav className="ml-auto hidden lg:flex gap-8 items-center">
        <Link
          className="text-sm font-medium text-[#2C3E50] dark:text-white hover:text-[#1CB0F6] transition-colors"
          href="/about"
          onClick={handleNavigation('/about')}
        >
          About Us
        </Link>
        <div className="relative group">
          <Link
            className="text-sm font-medium text-[#2C3E50] dark:text-white hover:text-[#1CB0F6] transition-colors"
            href="/career-tools"
            onClick={handleNavigation('/career-tools')}
          >
            Career Tools
          </Link>
        </div>
        <Link
          className="text-sm font-medium text-[#2C3E50] dark:text-white hover:text-[#1CB0F6] transition-colors"
          href="/how-it-works"
          onClick={handleNavigation('/how-it-works')}
        >
          How It Works
        </Link>
        <Link
          className="text-sm font-medium text-[#2C3E50] dark:text-white hover:text-[#1CB0F6] transition-colors"
          href="/support"
          onClick={handleNavigation('/support')}
        >
          Support
        </Link>
        <Link
          className="text-sm font-medium text-[#2C3E50] dark:text-white hover:text-[#1CB0F6] transition-colors"
          href="/pricing"
          onClick={handleNavigation('/pricing')}
        >
          Pricing
        </Link>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-gray-800" />
          )}
        </button>

        {status === "authenticated" ? (
          <div className="ml-8 flex gap-4">
            <Button
              onClick={handleNavigation('/dashboard')}
              variant="outline"
              className="border-2 border-[#8A2EFF] text-[#8A2EFF] hover:bg-[#8A2EFF]/10"
            >
              Dashboard
            </Button>
            <Button
              onClick={() => signOut()}
              variant="default"
              className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white"
            >
              Logout
            </Button>
          </div>
        ) : status === "unauthenticated" && !isAuthPage ? (
          <div className="ml-8">
            <Button
              onClick={handleNavigation('/register')}
              variant="default"
              className="bg-[#8A2EFF] hover:bg-[#7325D4]"
            >
              Join us
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
            onClick={handleNavigation('/about')}
          >
            About Us
          </button>
          <button
            className="p-8 hover:bg-[#1CB0F6]/10 w-full text-left transition-colors"
            onClick={handleNavigation('/career-tools')}
          >
            Career Tools
          </button>
          <button
            className="p-8 hover:bg-[#1CB0F6]/10 w-full text-left transition-colors"
            onClick={handleNavigation('/how-it-works')}
          >
            How It Works
          </button>
          <button
            className="p-8 hover:bg-[#1CB0F6]/10 w-full text-left transition-colors"
            onClick={handleNavigation('/support')}
          >
            Support
          </button>
          {status === "authenticated" ? (
            <>
              <button
                onClick={handleNavigation('/dashboard')}
                className="p-8 hover:bg-[#1CB0F6]/10 w-full text-left transition-colors"
              >
                Dashboard
              </button>
              {/* <button
                onClick={() => signOut()}
                className="p-8 bg-[#1CB0F6] hover:bg-[#1890d0] w-full text-left transition-colors"
              >
                Logout
              </button> */}
            </>
          ) : status === "unauthenticated" && !isAuthPage ? (
            <button
              onClick={handleNavigation('/register')}
              className="p-8 bg-[#1CB0F6] hover:bg-[#1890d0] w-full text-left transition-colors"
            >
              Join us
            </button>
          ) : null}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
