"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetMilestonesByCareer } from "@/services/useMilestones";
import { useProfile } from "@/services/useProfile";
import { Box, Flex, Progress, Spinner, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Crown, Flame, Target } from "lucide-react";
import { useEffect, useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function MilestonesPage() {
  const { profile, isLoading: isLoadingProfile } = useProfile();
  const { data: milestones, isLoading: isLoadingMilestones } = useGetMilestonesByCareer(
    profile?._id,
    profile?.projectedRole
  );
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);

  useEffect(() => {
    if (milestones?.length > 0 && !selectedMilestone) {
      setSelectedMilestone(milestones[0]);
    }
  }, [milestones]);

  if (isLoadingProfile || isLoadingMilestones) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="xl" color="#58CC02" />
      </div>
    );
  }

  const completedMilestones = milestones?.filter((m: any) => m.isCompleted)?.length || 0;
  const totalMilestones = milestones?.length || 0;
  const progress = (completedMilestones / totalMilestones) * 100;

  return (
    <div className="container p-6 mx-auto">
      {/* Header Section */}
      <motion.div
        className="mb-8 bg-[#1A1A1A] p-6 rounded-2xl border border-[#333333]"
        {...fadeInUp}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-[#58CC02]/10">
            <Target className="w-6 h-6 text-[#58CC02]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Career Milestones</h1>
            <Text className="text-gray-400">Track your progress towards becoming a {profile?.projectedRole}</Text>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Progress
              value={progress}
              size="lg"
              colorScheme="green"
              bg="#333333"
              borderRadius="full"
            />
          </div>
          <Text className="text-white font-bold">{Math.round(progress)}%</Text>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            { label: "Milestones", value: totalMilestones, icon: Target },
            { label: "Completed", value: completedMilestones, icon: Crown },
            { label: "In Progress", value: totalMilestones - completedMilestones, icon: Clock },
            { label: "Current Streak", value: "3 days", icon: Flame },
          ].map((stat, index) => (
            <div key={index} className="bg-[#222222] p-4 rounded-xl border border-[#333333]">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-4 h-4 text-[#1CB0F6]" />
                <Text fontSize="sm" color="gray.400">{stat.label}</Text>
              </div>
              <Text fontSize="xl" fontWeight="bold" color="white">{stat.value}</Text>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Milestones Path */}
        <motion.div
          className="space-y-4 lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-3">
            {milestones?.map((milestone: any, index: number) => (
              <motion.div
                key={milestone._id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl cursor-pointer transition-colors relative ${selectedMilestone?._id === milestone._id
                  ? "bg-[#58CC02] text-white"
                  : "bg-[#1A1A1A] hover:bg-[#222222] text-white"
                  }`}
                onClick={() => setSelectedMilestone(milestone)}
              >
                <div className="absolute -left-2 -top-2 bg-[#1CB0F6] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <Flex align="center" justify="space-between" className="ml-6">
                  <Box>
                    <Text fontWeight="bold">{milestone.title}</Text>
                    <Text fontSize="sm" opacity={0.7} mt={1}>
                      Required Grade: {milestone.skillGrade}%
                    </Text>
                  </Box>
                  <Box>
                    {milestone.isCompleted ? (
                      <Crown className="w-5 h-5 text-[#FFD700]" />
                    ) : (
                      <Clock className="w-5 h-5 opacity-50" />
                    )}
                  </Box>
                </Flex>

                <Progress
                  value={milestone.skillGrade}
                  className="mt-3"
                  size="xs"
                  colorScheme={milestone.isCompleted ? "green" : "blue"}
                  bg="#333333"
                  borderRadius="full"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Selected Milestone Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {selectedMilestone ? (
            <Card className="bg-[#1A1A1A] border-[#333333] text-white sticky top-24">
              <div className="p-6 border-b border-[#333333]">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-6 h-6 text-[#58CC02]" />
                  <Text fontWeight="bold" fontSize="xl">{selectedMilestone.title}</Text>
                </div>
                <Text opacity={0.7}>{selectedMilestone.description}</Text>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <Text fontWeight="semibold" mb={3}>Skills to Master</Text>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedMilestone.skills.map((skill: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 rounded-lg bg-[#222222] border border-[#333333] hover:bg-[#2A2A2A] transition-colors"
                      >
                        <ArrowRight className="w-4 h-4 text-[#58CC02]" />
                        <Text fontSize="sm">{skill}</Text>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Text fontWeight="semibold" mb={2}>Current Status</Text>
                  <Box
                    className={`inline-block px-3 py-1 rounded-full text-sm ${selectedMilestone.isCompleted
                      ? "bg-[#58CC02]/10 text-[#58CC02]"
                      : "bg-[#1CB0F6]/10 text-[#1CB0F6]"
                      }`}
                  >
                    {selectedMilestone.isCompleted ? "Mastered" : "In Progress"}
                  </Box>
                  {selectedMilestone.completedAt && (
                    <Text fontSize="sm" mt={2} opacity={0.7}>
                      Mastered on: {new Date(selectedMilestone.completedAt).toLocaleDateString()}
                    </Text>
                  )}
                </div>

                <Button
                  className={`w-full ${selectedMilestone.isCompleted
                    ? "bg-[#58CC02] hover:bg-[#46a102]"
                    : "bg-[#1CB0F6] hover:bg-[#179ad9]"
                    } text-white`}
                  disabled={selectedMilestone.isCompleted}
                >
                  {selectedMilestone.isCompleted ? "Milestone Completed" : "Practice Skills"}
                </Button>
              </div>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a milestone to view details
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 