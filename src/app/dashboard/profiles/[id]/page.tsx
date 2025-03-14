"use client"

import { Card } from "@/components/ui/card";
import { useProfile } from "@/services/useProfile";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, GraduationCap, Mail, User2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function ProfileViewPage() {
  const { id } = useParams();
  const { getProfileById: profile, isLoading } = useProfile(id as string);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" color="#58CC02" />
      </div>
    );
  }

  return (
    <div className="container p-6 mx-auto">
      <Link
        href="/dashboard/profiles"
        className="inline-flex items-center text-gray-400 hover:text-white mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Profiles
      </Link>

      {
        profile && (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            {...fadeInUp}
          >
            {/* Profile Card */}
            <Card className="bg-[#1A1A1A] border-[#333333] text-white p-6 lg:sticky lg:top-24 h-fit">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-[#222222] border-4 border-[#58CC02] flex items-center justify-center mb-4">
                  <User2 className="w-12 h-12 text-[#58CC02]" />
                </div>
                <Text fontSize="2xl" fontWeight="bold">{profile.name}</Text>
                <Text className="text-gray-400 mt-1">{profile.email}</Text>

                <div className="w-full mt-6 space-y-3">
                  {profile.currentRole && (
                    <div className="flex items-center gap-2 bg-[#222222] p-3 rounded-lg">
                      <Briefcase className="w-5 h-5 text-[#1CB0F6]" />
                      <Text>{profile.currentRole}</Text>
                    </div>
                  )}
                  {profile.projectedRole && (
                    <div className="flex items-center gap-2 bg-[#222222] p-3 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-[#FFD700]" />
                      <Text>Aspiring {profile.projectedRole}</Text>
                    </div>
                  )}
                  <Link
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 bg-[#58CC02] p-3 rounded-lg hover:bg-[#46a102] transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <Text>Contact</Text>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              {profile.bio && (
                <Card className="bg-[#1A1A1A] border-[#333333] text-white p-6">
                  <Text fontWeight="bold" className="text-lg mb-3">About</Text>
                  <Text className="text-gray-400 whitespace-pre-line">{profile.bio}</Text>
                </Card>
              )}

              {(profile.education || profile.experience) && (
                <Card className="bg-[#1A1A1A] border-[#333333] text-white p-6">
                  {profile.education && (
                    <Box mb={6}>
                      <Text fontWeight="bold" className="text-lg mb-3">Education</Text>
                      <Text className="text-gray-400">{profile.education}</Text>
                    </Box>
                  )}
                  {profile.experience && (
                    <Box>
                      <Text fontWeight="bold" className="text-lg mb-3">Experience</Text>
                      <Text className="text-gray-400 whitespace-pre-line">{profile.experience}</Text>
                    </Box>
                  )}
                </Card>
              )}
            </div>
          </motion.div>
        )
      }
    </div>
  );
} 