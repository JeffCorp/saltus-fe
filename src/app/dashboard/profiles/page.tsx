"use client"

import { Card } from "@/components/ui/card";
import { useProfile } from "@/services/useProfile";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, GraduationCap, Search, User2, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function ProfilesPage() {
  const { getAllProfiles, isLoading } = useProfile();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProfiles = getAllProfiles

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
        className="mb-8 bg-[#1A1A1A] p-6 rounded-2xl border border-[#333333]"
        {...fadeInUp}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-[#58CC02]/10">
            <Users className="w-6 h-6 text-[#58CC02]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Community Profiles</h1>
            <Text className="text-gray-400">Connect with other professionals in your field</Text>
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
            className="w-full pl-12 pr-4 py-3 bg-[#222222] border border-[#333333] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#58CC02]"
          />
        </div>
      </motion.div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles?.map((profile: any) => (
          <motion.div
            key={profile._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href={`/dashboard/profiles/${profile._id}`}>
              <Card className="bg-[#1A1A1A] border-[#333333] text-white hover:border-[#58CC02] transition-colors p-6">
                <Flex align="center" gap={4}>
                  <Box className="w-12 h-12 rounded-full bg-[#222222] border border-[#333333] flex items-center justify-center">
                    <User2 className="w-6 h-6 text-[#58CC02]" />
                  </Box>
                  <Box>
                    <Text fontWeight="bold" fontSize="lg">{profile.name}</Text>
                    <Text fontSize="sm" color="gray.400">{profile.email}</Text>
                  </Box>
                </Flex>

                <div className="mt-4 space-y-3">
                  {profile.currentRole && (
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4 text-[#1CB0F6]" />
                      <Text>{profile.currentRole}</Text>
                    </div>
                  )}
                  {profile.projectedRole && (
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="w-4 h-4 text-[#FFD700]" />
                      <Text>Aspiring {profile.projectedRole}</Text>
                    </div>
                  )}
                </div>

                {profile.bio && (
                  <Text className="mt-4 text-sm text-gray-400 line-clamp-2">
                    {profile.bio}
                  </Text>
                )}

                <div className="mt-4 flex items-center justify-end text-[#58CC02] text-sm font-medium">
                  View Profile <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredProfiles?.length === 0 && (
        <div className="text-center text-gray-400 mt-8">
          No profiles found matching your search criteria.
        </div>
      )}
    </div>
  );
} 