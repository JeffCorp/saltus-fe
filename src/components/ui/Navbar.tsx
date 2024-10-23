"use client";

import { Rocket, MenuIcon, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const handleNav = (path: string) => {
    toggleMenu();
    router.push(path);
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link
        className="flex items-center justify-center"
        href="/"
        onClick={() => {
          router.push("/");
          setIsOpen(false);
        }}
      >
        <Rocket className="h-6 w-6 mr-2" />
        <span className="font-bold text-lg">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </span>
      </Link>

      {/* web view */}
      <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6 items-center">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Contact
        </Link>
        {status === "authenticated" ? (
          <div className="ml-20 flex gap-4 ">
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-indigo-600 text-white text-sm"
              variant="outline"
            >
              Dashboard
            </Button>
            <Button
              onClick={() => signOut()}
              className="bg-black text-white text-sm"
              variant="default"
            >
              Logout
            </Button>
          </div>
        ) : status === "unauthenticated" ? (
          <div className="ml-20 flex gap-4 text-sm">
            <Button
              onClick={() => router.push("/login")}
              className="bg-black text-white text-sm"
              variant="default"
            >
              Login
            </Button>

            <Button
              onClick={() => router.push("/register")}
              className="border-black text-black text-sm"
              variant="outline"
            >
              Register
            </Button>
          </div>
        ) : null}
      </nav>
      <button onClick={toggleMenu} className="ml-auto lg:hidden">
        {isOpen ? <X /> : <MenuIcon className="h-6 w-6" />}
      </button>
      {/* mobile view */}
      {isOpen && (
        <nav className="flex lg:hidden flex-col absolute right-0 top-14 items-start w-full h-full bg-black text-white z-50">
          <button
            className="p-8 hover:bg-gray-100 hover:text-black w-full"
            onClick={() => handleNav("/features")}
          >
            Features
          </button>
          <button
            className="p-8 hover:bg-gray-100 hover:text-black w-full"
            onClick={() => handleNav("/pricing")}
          >
            Pricing
          </button>
          <button
            className="p-8 hover:bg-gray-100 hover:text-black w-full"
            onClick={() => handleNav("/about")}
          >
            About
          </button>
          <button
            className="p-8 hover:bg-gray-100 hover:text-black w-full"
            onClick={() => handleNav("/contact")}
          >
            Contact
          </button>
          <button
            className="p-8 hover:bg-gray-100 hover:text-black w-full"
            onClick={() => handleNav("/pricing")}
          >
            Features
          </button>
          {status === "authenticated" ? (
            <>
              <button
                onClick={() => handleNav("/dashboard")}
                className="p-8 hover:bg-gray-100 hover:text-black w-full"
              >
                Dashboard
              </button>
              <button
                onClick={() => signOut()}
                className="p-8 hover:bg-gray-100 hover:text-black w-full"
              >
                Logout
              </button>
            </>
          ) : status === "unauthenticated" ? (
            <>
              <button
                onClick={() => handleNav("/login")}
                className="p-8 hover:bg-gray-100 hover:text-black w-full"
              >
                Login
              </button>

              <button
                onClick={() => handleNav("/register")}
                className="p-8 hover:bg-gray-100 hover:text-black w-full"
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
