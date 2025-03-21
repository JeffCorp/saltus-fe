"use client"

import { Card } from "@/components/ui/card";
import { useProfile } from "@/services/useProfile";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, GraduationCap, Search, User2, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function ProfilesPage() {
  const { data: session } = useSession();
  const { connections, isLoading } = useProfile();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProfiles = connections

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" color="#58CC02" />
      </div>
    );
  }

  return (
    <div className="container p-6 mx-auto">
      {/* Header Section */}
      <motion.div
        className="mb-8 dark:bg-[#1A1A1A] bg-white dark:border-[#333333] border-gray-50 p-6 rounded-2xl"
        {...fadeInUp}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl dark:bg-[#58CC02]/10 bg-gray-50">
            <Users className="w-6 h-6 text-[#58CC02]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold dark:text-white text-black">Connections</h1>
            <Text className="text-gray-400">View your connections</Text>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, current role, or target role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 dark:bg-[#222222] bg-white dark:border-[#333333] border-gray-50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#58CC02]"
          />
        </div>
      </motion.div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles?.map((user: any) => {
          const profile = user.requester._id === session?.user?.id ? user.recipient : user.requester;

          return (
            <motion.div
              key={profile._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href={`/dashboard/profiles/${profile._id}`}>
                <Card className="dark:bg-[#1A1A1A] bg-white dark:border-[#333333] border-gray-50 text-white hover:border-[#58CC02] transition-colors p-6">
                  <Flex align="center" gap={4}>
                    <Box className="w-12 h-12 rounded-full dark:bg-[#222222] bg-gray-50 border border-[#333333] flex items-center justify-center">
                      <User2 className="w-6 h-6 text-[#58CC02]" />
                    </Box>
                    <Box>
                      <Text fontWeight="bold" fontSize="lg" className="dark:text-white text-black">{profile.name}</Text>
                      <Text fontSize="sm" className="dark:text-gray-400 text-gray-700">{profile.email}</Text>
                    </Box>
                  </Flex>

                  <div className="mt-4 space-y-3">
                    {profile.currentRole && (
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="w-4 h-4 text-[#1CB0F6]" />
                        <Text className="dark:text-white text-black">{profile.currentRole}</Text>
                      </div>
                    )}
                    {profile.projectedRole && (
                      <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="w-4 h-4 text-[#FFD700]" />
                        <Text className="dark:text-white text-black">Aspiring {profile.projectedRole}</Text>
                      </div>
                    )}
                  </div>

                  {profile.bio && (
                    <Text className="mt-4 text-sm dark:text-gray-400 text-gray-700 line-clamp-2">
                      {profile.bio}
                    </Text>
                  )}

                  <div className="mt-4 flex items-center justify-end text-[#58CC02] text-sm font-medium">
                    View Profile <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {connections?.length === 0 && (
        <div className="text-center text-gray-400 mt-8">
          No connections found matching your search criteria.
        </div>
      )}
    </div>
  );
} 