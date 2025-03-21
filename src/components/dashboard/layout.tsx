"use client";

import Notification from "@/components/notifications/Notification";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { useSocket } from "@/lib/socket";
import { useProfile } from "@/services/useProfile";
import { Box, HStack, Text } from "@chakra-ui/react";
import {
  Bell,
  BookOpen,
  BriefcaseIcon,
  ChevronDown,
  Crown,
  GraduationCap,
  Home,
  LineChart,
  LogOut,
  MessageSquare,
  Moon,
  Rocket,
  Settings,
  Sun,
  UserCircle,
  Users,
  UsersRound,
  X
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const socket = useSocket();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { profile, isLoading: isLoadingProfile, updateProfile, isUpdating, updateProfileData, isUpdatingProfileData } = useProfile();
  const [notification, setNotification] = useState<{
    title: string,
    message: string,
    data: any,
  }>({ title: '', message: '', data: {} });
  const [open, setOpen] = useState(false);
  const navItems = [
    { name: "Home", icon: Home, link: "/dashboard", color: "#58CC02" },
    { name: "Career Path", icon: LineChart, link: "/dashboard/career-path", color: "#FF9600" },
    { name: "Mentors", icon: Users, link: "/dashboard/mentors", color: "#8A2EFF" },
    { name: "Network", icon: MessageSquare, link: "/dashboard/network", color: "#FF4B4B" },
    { name: "Connections", icon: UsersRound, link: "/dashboard/profiles", color: "#1CB0F6" },
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

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Notification => Connected to socket");
      });

      socket.on("notification", (notification: any) => {
        console.log("Notification =>", notification);
        setNotification({
          title: notification?.title,
          message: notification?.message,
          data: notification?.data
        });
        setOpen(true);
      });
    }

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("notification");
      }
    }
  }, [socket]);

  useEffect(() => {
    // Close menus when pathname changes

    return () => {
      setIsSidebarOpen(false);
      setIsMenuOpen(false);
    }
  }, [pathname]); // Watch pathname instead of router.events

  return (
    <div className="flex h-screen dark:bg-[#111111] bg-white flex-col md:flex-row">
      <Notification
        title={notification?.title}
        message={notification?.message}
        data={notification?.data}
        open={open}
        setOpen={setOpen}
      />
      {/* Sidebar */}
      <aside className={`min-w-64 dark:bg-[#1A1A1A] bg-white shadow-lg flex-1 md:flex-none md:w-64 h-full z-10 ${isSidebarOpen ? "block" : "hidden md:block"}`}>
        <div className="p-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-black dark:text-white flex items-center"
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
              className={`flex items-center px-6 py-3 dark:text-gray-300 text-black dark:hover:bg-[#222222] hover:bg-gray-50 transition-all duration-300 
                ${pathname === item.link ?
                  "dark:bg-[#222222] bg-gray-100 border-l-4 pl-5" : ""}`}
              style={{
                borderLeftColor: pathname === item.link ? item.color : 'transparent'
              }}
              onClick={() => handleNavigation(item.name)}
            >
              <item.icon
                className="h-5 w-5 mr-3"
                style={{ color: item.color }}
              />
              <span className={pathname === item.link ? "dark:text-white text-black" : ""}>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 w-full">
          <Link
            href="/"
            className="w-full flex items-center px-6 py-3 justify-center text-[#FF4B4B] border-[#FF4B4B] hover:bg-[#FF4B4B]/10"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col md:flex-[5] max-md:fixed max-md:w-full dark:bg-[#111111] bg-white">
        {/* Header */}
        <header className="dark:bg-[#1A1A1A] bg-white text-black fixed top-0 md:right-0 w-[100%] md:w-[calc(100%-16rem)] z-[1] shadow-lg border-b dark:border-[#333333] border-gray-50">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 hover:bg-[#222222]">
                {isSidebarOpen ? <X className="h-5 w-5" /> : <IoIosMenu className="h-5 w-5" />}
              </Button>
            </div>
            <h2 className="text-2xl font-bold leading-7 text-black dark:text-white sm:truncate w-full ml-4">
              {navItems.find(item => item.link === pathname)?.name}
            </h2>
            <div className="flex items-center gap-2">
              {/* <NotificationsDropdown /> */}
              <button
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark")
                  localStorage.setItem("theme", theme === "dark" ? "light" : "dark")
                }}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-[#8A2EFF]" />
                )}
              </button>
              <Button variant="outline" className="dark:bg-[#222222] dark:text-white dark:border-[#333333] dark:hover:bg-[#333333] hover:bg-gray-50" onClick={() => router.push('/dashboard/notifications')}>
                <Bell className="h-5 w-5" />
              </Button>
              <Box>
                <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="outline" className="dark:bg-[#222222] bg-gray-100 dark:text-white text-black border-[#333333] dark:hover:bg-[#333333] hover:bg-gray-200 min-w-[230px] flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2 w-full">
                    {/* <UserCircle className="h-5 w-5" /> */}
                    <HStack gap="3">
                      <Avatar>
                        <AvatarFallback className="dark:bg-[#8A2EFF] bg-gray-50">
                          {session?.user?.name?.charAt(0)}
                        </AvatarFallback>
                        <AvatarImage src={session?.user?.image} />
                      </Avatar>
                    </HStack>
                    <div className="flex flex-col items-start w-full">
                      <span className="text-sm font-medium">{session?.user?.name}</span>
                      <span className="text-xs text-gray-400">{profile?.currentRole || 'Aspirant'}</span>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
                {isMenuOpen &&
                  <Box className="absolute top-[90px] right-[30px] w-[230px] dark:bg-[#222222] dark:border-[#333333] border-gray-100 text-white rounded-lg">
                    <DropdownMenuItem className="dark:hover:bg-[#333333] hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => router.push('/dashboard/profile')}>
                      <UserCircle className="mr-2 h-4 w-4" />
                      <Text color="white">Profile</Text>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="dark:hover:bg-[#333333] hover:bg-gray-100 flex items-center cursor-pointer text-yellow-500">
                      <Crown className="mr-2 h-4 w-4" />
                      <Text color="white">Upgrade</Text>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="dark:hover:bg-[#333333] hover:bg-gray-100 flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <Text color="white">Settings</Text>
                    </DropdownMenuItem>
                  </Box>
                }
              </Box>
            </div>
          </div>
        </header>

        <div className="pt-[80px] dark:bg-[#111111] bg-gray-50 overflow-y-scroll h-[100vh] text-white">
          {children}
        </div>

        {/* Floating Action Button */}
        {/* <Button
          className="fixed bottom-[50px] right-[50px] !rounded-full shadow-lg !p-0 !w-[60px] !h-[60px] bg-[#8A2EFF] hover:bg-[#7325D4] transition-all duration-300 hover:scale-110 flex items-center justify-center"
        >
          <MessageSquare className="h-6 w-6" />
        </Button> */}
      </main>
    </div>
  );
}
