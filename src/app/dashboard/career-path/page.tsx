"use client"

import ViewDetailedPlan from '@/components/career-path/view-detailed-plan';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCertificatesByUserId } from "@/services/useCertificates";
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
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (profile) {
      getSkillsProgress(profile._id)
      getSkills(profile._id)
    }
  }, [profile?._id])

  const computeSkillsProgress = useMemo(() => {
    if (!skillsProgress || skillsProgress.length === 0) return 0
    const totalSkills = skillsProgress?.length
    return (skillsProgress?.reduce((acc, skill) => acc + skill.progress, 0) / totalSkills)
  }, [skillsProgress])

  const milestones = [
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

  if (isLoadingProfile || isLoadingSkills || isLoadingSkillsProgress) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner color="#8A2EFF" size="xl" />
      </div>
    )
  }

  return (
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {milestones.map((milestone, index) => (
          <Card
            key={index}
            className={`bg-[#1A1A1A] border-[#333333] transform hover:scale-105 transition-all duration-300
              ${milestone.completed ? 'border-l-4' : 'opacity-70'}`}
            style={{ borderLeftColor: milestone.completed ? milestone.color : 'transparent' }}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 rounded-xl" style={{ backgroundColor: `${milestone.color}20` }}>
                <milestone.icon className="w-8 h-8" style={{ color: milestone.color }} />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-white">{milestone.title}</CardTitle>
                <p className="text-sm text-gray-400">{milestone.description}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {milestone.skills.map((skill, i) => (
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
  )
}
