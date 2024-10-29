"use client";

import { Button } from "@/components/ui/button";
import {
  Bell,
  BookOpen,
  BriefcaseIcon,
  GraduationCap,
  Home,
  LineChart,
  LogOut,
  MessageSquare,
  Rocket,
  Users,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("Home");

  const navItems = [
    { name: "Home", icon: Home, link: "/dashboard" },
    { name: "Career Path", icon: LineChart, link: "/dashboard/career-path" },
    { name: "Mentors", icon: Users, link: "/dashboard/mentors" },
    { name: "Network", icon: MessageSquare, link: "/dashboard/network" },
    { name: "Skills", icon: BookOpen, link: "/dashboard/skills" },
    { name: "Projects", icon: BriefcaseIcon, link: "/dashboard/projects" },
    { name: "Trends", icon: LineChart, link: "/dashboard/trends" },
    {
      name: "Interview Prep",
      icon: GraduationCap,
      link: "/dashboard/interview-prep",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="min-w-64 bg-white shadow-md flex-1">
        <div className="p-4">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-800 flex items-center"
          >
            <Rocket className="h-6 w-6 mr-2" />
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Link>
        </div>
        <nav className="mt-6 min-h-[calc(100%-200px)]">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className={`flex items-center px-6 py-4 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 ${
                activeTab === item.name ? "bg-indigo-600 text-white hover:bg-indigo-600 hover:text-white" : ""
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-center ml-3">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center text-indigo-600 border-indigo-600"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-[5] overflow-y-auto flex flex-col">
        {/* Header */}
        <header className="bg-white fixed top-0 right-0 w-[calc(100%-16rem)] bg-white">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
              {activeTab}
            </h2>
            <div className="flex items-center">
              <Button variant="outline" className="mr-2">
                <Bell className="h-5 w-5" />
              </Button>
              {/* <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full mr-2"
                      src="/placeholder.svg?height=32&width=32"
                      alt="User avatar"
                    />
                    <span>John Doe</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>
          </div>
        </header>

        <div className="pt-[80px] bg-white">{children}</div>
      </main>
    </div>
  );
}
