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
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
    { name: "Settings", icon: Settings, link: "/dashboard/settings" },
  ];

  const handleNavigation = (name: string) => {
    setIsSidebarOpen(false);
    setActiveTab(name)
  }

  return (
    <div className="flex h-screen bg-white flex-col md:flex-row">
      {/* Sidebar */}
      <aside className={`min-w-64 bg-[#f8f9fa] shadow-md flex-1 md:flex-none md:w-64 h-full z-10 ${isSidebarOpen ? "block" : "hidden md:block"}`}>
        <div className="p-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-800 flex items-center"
          >
            <Rocket className="h-6 w-6 mr-2" />
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
              className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 ${(pathname === item.link) ? "bg-indigo-600 text-white hover:bg-indigo-600 hover:text-white" : ""}`}
              onClick={() => handleNavigation(item.name)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-center mx-3">
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
      <main className="flex-1 overflow-y-auto flex flex-col md:flex-[5] max-md:fixed max-md:w-full">
        {/* Header */}
        <header className="bg-[#00000078] text-white fixed top-0 md:right-0 w-[100%] md:w-[calc(100%-16rem)] z-[100] shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center space">
            <div className="flex items-center">
              <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2">
                {isSidebarOpen ? <X className="h-5 w-5" /> : <IoIosMenu className="h-5 w-5" />}
              </Button>
            </div>
            <h2 className="text-2xl font-bold lesading-7 text-white sm:truncate w-full">
              {activeTab}
            </h2>
            <div className="flex items-center">
              <Button variant="outline" className="mr-2 bg-white text-black">
                <Bell className="h-5 w-5" />
              </Button>
              {/* <Menu>
                <MenuButton
                  as={Button}
                  variant="outline"
                  className="items-center border-2 border-white rounded-[5px] p-2 cursor-pointer hover:bg-white/10 transition-colors flex"
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-3" />
                    <div className="flex flex-col items-start">
                      <Text fontSize="sm">{session?.user.name}</Text>
                      <Text fontSize="xs" color="gray.300">{session?.user.email}</Text>
                    </div>
                  </div>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => signOut()}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </MenuItem>
                </MenuList>
              </Menu> */}
            </div>
          </div>
        </header>

        <div className="pt-[80px] bg-white overflow-y-scroll h-[100vh]">{children}</div>
        {/* Create a floating button to add new connections */}
        <Button className="fixed bottom-[50px] flex items-center justify-center right-[50px] bg-indigo-600 rounded-[50%] text-white p-4 rounded-full shadow-lg w-[70px] h-[70px]">
          <MessageSquare className="h-5 w-5" />
        </Button>
      </main>
    </div>
  );
}
