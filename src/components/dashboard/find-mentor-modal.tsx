"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProfile } from "@/services/useProfile";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Search, User2, Users } from "lucide-react";
import { useMemo, useState } from "react";

interface FindMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestMentorship: (mentorId: string) => void;
}

export function FindMentorModal({ isOpen, onClose, onRequestMentorship }: FindMentorModalProps) {
  const { getAllProfiles, isLoading } = useProfile();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProfiles = useMemo(() => {
    return getAllProfiles?.filter((profile: any) =>
      // profile.isMentor && (
      profile.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.currentRole?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.projectedRole?.toLowerCase().includes(searchTerm.toLowerCase())
      // )
    );
  }, [getAllProfiles, searchTerm]);

  console.log("getAllProfiles => ", getAllProfiles);
  console.log("filteredProfiles => ", filteredProfiles);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-[#1A1A1A] border-[#333333] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#58CC02]/10">
              <Users className="w-6 h-6 text-[#58CC02]" />
            </div>
            <span>Find a Mentor</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Connect with experienced professionals who can guide you in your career journey
          </DialogDescription>
        </DialogHeader>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, role, or expertise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#222222] border border-[#333333] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#58CC02]"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner size="xl" color="#58CC02" />
          </div>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {filteredProfiles?.map((profile: any) => (
              <motion.div
                key={profile._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#222222] rounded-xl p-4 border border-[#333333]"
              >
                <Flex justify="space-between" align="center">
                  <Flex align="center" gap={4}>
                    <Box className="w-12 h-12 rounded-full bg-[#2A2A2A] border border-[#333333] flex items-center justify-center">
                      <User2 className="w-6 h-6 text-[#58CC02]" />
                    </Box>
                    <Box>
                      <Text fontWeight="bold" fontSize="lg">{profile.name}</Text>
                      <div className="flex items-center gap-3 mt-1">
                        {profile.currentRole && (
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Briefcase className="w-4 h-4 text-[#1CB0F6]" />
                            <span>{profile.currentRole}</span>
                          </div>
                        )}
                        {profile.yearsOfExperience && (
                          <Text fontSize="sm" color="gray.400">
                            • {profile.yearsOfExperience} years of experience
                          </Text>
                        )}
                      </div>
                    </Box>
                  </Flex>
                  <Button
                    onClick={() => onRequestMentorship(profile._id)}
                    className="bg-[#58CC02] hover:bg-[#46a102] text-white flex items-center gap-2"
                  >
                    Request Mentorship
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Flex>

                {profile.expertise && (
                  <div className="mt-4">
                    <Text fontSize="sm" color="gray.400" mb={2}>
                      Expertise
                    </Text>
                    <div className="flex flex-wrap gap-2">
                      {profile.expertise.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm bg-[#1A1A1A] text-[#58CC02] rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {filteredProfiles?.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                No mentors found matching your search criteria.
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 