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
  Settings,
  Users,
  X
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname()
  const { data: session } = useSession();

  const navItems = [
    { name: "Home", icon: Home, link: "/dashboard", color: "#58CC02" },
    { name: "Career Path", icon: LineChart, link: "/dashboard/career-path", color: "#FF9600" },
    { name: "Mentors", icon: Users, link: "/dashboard/mentors", color: "#8A2EFF" },
    { name: "Network", icon: MessageSquare, link: "/dashboard/network", color: "#FF4B4B" },
    { name: "Skills", icon: BookOpen, link: "/dashboard/skills", color: "#1CB0F6" },
    { name: "Projects", icon: BriefcaseIcon, link: "/dashboard/projects", color: "#B35AF4" },
    { name: "Trends", icon: LineChart, link: "/dashboard/trends", color: "#FF9600" },
    { name: "Interview Prep", icon: GraduationCap, link: "/dashboard/interview-prep", color: "#FF4B4B" },
    { name: "Settings", icon: Settings, link: "/dashboard/settings", color: "#777777" },
  ];

  const handleNavigation = (name: string) => {
    setIsSidebarOpen(false);
    setActiveTab(name)
  }

  return (
    <div className="flex h-screen bg-[#111111] flex-col md:flex-row">
      {/* Sidebar */}
      <aside className={`min-w-64 bg-[#1A1A1A] shadow-lg flex-1 md:flex-none md:w-64 h-full z-10 ${isSidebarOpen ? "block" : "hidden md:block"}`}>
        <div className="p-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-white flex items-center"
          >
            <Rocket className="h-6 w-6 mr-2 text-[#8A2EFF]" />
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Link>
          <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="mt-6 min-h-[calc(100%-200px)]">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className={`flex items-center px-6 py-3 text-gray-300 hover:bg-[#222222] transition-all duration-300 
                ${pathname === item.link ?
                  "bg-[#222222] border-l-4 pl-5" : ""}`}
              style={{
                borderLeftColor: pathname === item.link ? item.color : 'transparent'
              }}
              onClick={() => handleNavigation(item.name)}
            >
              <item.icon
                className="h-5 w-5 mr-3"
                style={{ color: item.color }}
              />
              <span className={pathname === item.link ? "text-white" : ""}>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center text-[#FF4B4B] border-[#FF4B4B] hover:bg-[#FF4B4B]/10"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col md:flex-[5] max-md:fixed max-md:w-full bg-[#111111]">
        {/* Header */}
        <header className="bg-[#1A1A1A] text-white fixed top-0 md:right-0 w-[100%] md:w-[calc(100%-16rem)] z-[100] shadow-lg border-b border-[#333333]">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 hover:bg-[#222222]">
                {isSidebarOpen ? <X className="h-5 w-5" /> : <IoIosMenu className="h-5 w-5" />}
              </Button>
            </div>
            <h2 className="text-2xl font-bold leading-7 text-white sm:truncate w-full ml-4">
              {activeTab}
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="bg-[#222222] text-white border-[#333333] hover:bg-[#333333]">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="pt-[80px] bg-[#111111] overflow-y-scroll h-[100vh] text-white">
          {children}
        </div>

        {/* Floating Action Button */}
        <Button
          className="fixed bottom-[50px] right-[50px] rounded-full shadow-lg w-[60px] h-[60px] bg-[#8A2EFF] hover:bg-[#7325D4] transition-all duration-300 hover:scale-110"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </main>
    </div>
  );
}
