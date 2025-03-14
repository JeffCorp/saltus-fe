"use client"

import ViewDetailedPlan from '@/components/career-path/view-detailed-plan';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetCertificatesByUserId } from "@/services/useCertificates";
import { useCreateMilestone, useGetMilestonesByCareer } from "@/services/useMilestones";
import { useProfile } from "@/services/useProfile";
import { useSkills } from "@/services/useSkills";
import { useSkillsProgressByUserId } from "@/services/useSkillsProgress";
import { Spinner } from "@chakra-ui/react";
import { Briefcase, GraduationCap, LineChart, Star, Trophy } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

export default function CareerPath() {
  const { data: session } = useSession()
  const { profile, isLoading: isLoadingProfile } = useProfile()
  const { data: skillsProgress, mutate: getSkillsProgress, isPending: isLoadingSkillsProgress } = useSkillsProgressByUserId()
  const { mutate: getSkills, data: skills, isPending: isLoadingSkills } = useSkills()
  const { data: certificates, isLoading: isLoadingCertificates } = useGetCertificatesByUserId(profile?._id)
  const { data: milestonesData, isLoading: isLoadingMilestones } = useGetMilestonesByCareer(profile?._id, profile?.projectedRole)
  const { mutate: createMilestone, isPending: isCreatingMilestones } = useCreateMilestone()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showMilestonesModal, setShowMilestonesModal] = useState(false)
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);

  useEffect(() => {
    if (profile) {
      getSkillsProgress(profile._id)
      getSkills(profile._id)
    }
  }, [profile?._id])

  useEffect(() => {
    if (!isLoadingMilestones && !milestonesData?.length && profile?._id) {
      setShowMilestonesModal(true)
    }
  }, [isLoadingMilestones, milestonesData, profile?._id])

  const computeSkillsProgress = useMemo(() => {
    if (!skillsProgress || skillsProgress.length === 0) return 0
    const totalSkills = skillsProgress?.length
    return (skillsProgress?.reduce((acc, skill) => acc + skill.progress, 0) / totalSkills)
  }, [skillsProgress])

  console.log("milestonesData => ", milestonesData);
  const milestones = useMemo(() => {
    if (!milestonesData) return [];
    const dummyMilestones = [
      {
        title: "Entry Level",
        description: "0-2 years experience",
        icon: GraduationCap,
        color: "#58CC02",
        skills: ["Basic Programming", "Team Collaboration", "Problem Solving"],
        completed: computeSkillsProgress >= 25
      },
      {
        title: "Mid Level",
        description: "2-5 years experience",
        icon: Briefcase,
        color: "#1CB0F6",
        skills: ["System Design", "Project Leadership", "Mentoring"],
        completed: computeSkillsProgress >= 50
      },
      {
        title: "Senior Level",
        description: "5-8 years experience",
        icon: Star,
        color: "#8A2EFF",
        skills: ["Architecture Design", "Team Management", "Strategic Planning"],
        completed: computeSkillsProgress >= 75
      },
      {
        title: "Lead/Principal",
        description: "8+ years experience",
        icon: Trophy,
        color: "#FF9600",
        skills: ["Technical Vision", "Organization Leadership", "Innovation"],
        completed: computeSkillsProgress >= 90
      }
    ]

    return milestonesData.map((milestone: any, index: number) => ({
      ...dummyMilestones[index],
      ...milestone,
      completed: computeSkillsProgress >= milestone.skillGrade
    }))
  }, [milestonesData, profile?._id])

  const trends = [
    {
      title: "Skills Progress",
      value: `${Math.round(computeSkillsProgress)}%`,
      description: "Overall completion of required skills",
      icon: LineChart,
      color: "#FF4B4B"
    },
    {
      title: "Certifications",
      value: certificates?.length || 0,
      description: "Completed certifications",
      icon: Star,
      color: "#B35AF4"
    }
  ]

  const handleCreateMilestones = () => {
    if (!profile?._id || !profile?.careerPath) return;

    createMilestone({
      userId: profile._id,
      careerName: profile.careerPath,
      title: "Initial Milestone",
      description: "Initial Description",
      skills: [],
      skillGrade: 0,
      status: "pending",
      isCompleted: false
    }, {
      onSuccess: () => {
        setShowMilestonesModal(false)
      }
    })
  }

  const handleMilestoneClick = (milestone: any) => {
    setSelectedMilestone(milestone);
    setIsMilestoneModalOpen(true);
  };

  if (isLoadingProfile || isLoadingSkills || isLoadingSkillsProgress || isLoadingMilestones) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner color="#8A2EFF" size="xl" />
      </div>
    )
  }

  console.log("milestones => ", milestones);

  return (
    <>
      <div className="container p-6 mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#333333]">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
            Your Career Journey
          </h1>
          <p className="mt-2 text-gray-400">
            Current Role: {profile?.currentRole || "Not Set"} → Target: {profile?.projectedRole || "Not Set"}
          </p>
        </div>

        {/* Career Timeline */}
        <div className="flex flex-row flex-wrap gap-6">
          {milestones.map((milestone: any, index: number) => (
            <Card
              key={index}
              onClick={() => handleMilestoneClick(milestone)}
              className={`bg-[#1A1A1A] border-[#333333] transform hover:scale-105 transition-all duration-300 cursor-pointer min-w-[200px] flex-1
                ${milestone.completed ? 'border-l-4' : 'opacity-70'}`}
              style={{ borderLeftColor: milestone.completed ? milestone.color : 'transparent' }}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 rounded-xl" style={{ backgroundColor: `${milestone.color}20` }}>
                  {milestone?.icon && <milestone.icon className="w-8 h-8" style={{ color: milestone.color }} />}
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-white">{milestone.title}</CardTitle>
                  <p className="text-sm text-gray-400 line-clamp-1">{milestone.description}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {milestone.skills.map((skill: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: milestone.color }} />
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Market Trends */}
        <div className="grid gap-6 md:grid-cols-2">
          {trends.map((trend, index) => (
            <Card
              key={index}
              className="bg-[#1A1A1A] border-[#333333] transform hover:scale-105 transition-all duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl" style={{ backgroundColor: `${trend.color}20` }}>
                    <trend.icon className="w-6 h-6" style={{ color: trend.color }} />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-white">{trend.title}</CardTitle>
                    <p className="text-sm text-gray-400">{trend.description}</p>
                  </div>
                </div>
                <span
                  className="text-2xl font-bold"
                  style={{ color: trend.color }}
                >
                  {trend.value}
                </span>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Skills Progress */}
        <Card className="bg-[#1A1A1A] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Your Skills Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillsProgress?.filter(skill => !skill.completed).slice(0, 3).map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-[#8A2EFF]" />
                <span className="text-gray-300">
                  {typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId.name}
                </span>
                <div className="ml-auto text-sm text-gray-400">
                  {skill.progress}% Complete
                </div>
              </div>
            ))}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-4 p-3 rounded-xl bg-[#8A2EFF]/10 text-[#8A2EFF] hover:bg-[#8A2EFF]/20 transition-colors"
            >
              View Detailed Plan
            </button>
          </CardContent>
        </Card>

        <ViewDetailedPlan
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          careerPath={profile?.careerPath || ""}
          skillsProgress={skillsProgress || []}
        />
      </div>

      <Dialog open={showMilestonesModal} onOpenChange={setShowMilestonesModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Create Your Career Milestones</DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400 pt-2">
              We noticed you don't have any milestones set for your career path.
              Would you like us to create personalized milestones based on your selected career as a {profile?.projectedRole}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-start">
            <Button
              onClick={handleCreateMilestones}
              disabled={isCreatingMilestones}
              className="bg-[#1CB0F6] hover:bg-[#1890d0] text-white"
            >
              {isCreatingMilestones ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Creating...
                </>
              ) : (
                "Yes, Create Milestones"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowMilestonesModal(false)}
              className="border-gray-200 dark:border-[#333333]"
            >
              Maybe Later
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isMilestoneModalOpen} onOpenChange={setIsMilestoneModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedMilestone?.icon && (
                <div className="p-2 rounded-xl" style={{ backgroundColor: `${selectedMilestone.color}20` }}>
                  <selectedMilestone.icon className="w-6 h-6" style={{ color: selectedMilestone.color }} />
                </div>
              )}
              <span>{selectedMilestone?.title}</span>
            </DialogTitle>
            <DialogDescription className="pt-2">
              {selectedMilestone?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
              <div className="space-y-2">
                {selectedMilestone?.skills.map((skill: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedMilestone.color }} />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Progress</h3>
              <div className="text-sm text-gray-400">
                Required Skill Grade: {selectedMilestone?.skillGrade}%
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
