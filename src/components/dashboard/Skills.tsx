'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useProfile } from "@/services/useProfile"
import { useSkillsProgressByUserId } from "@/services/useSkillsProgress"
import { Text } from "@chakra-ui/react"
import { Book, RefreshCcw, Star, Target, TrendingUp } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Skills() {
  const { data: session } = useSession();
  const { mutate: getSkillsProgress, data: skillsProgress } = useSkillsProgressByUserId();
  const { profile } = useProfile()
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.id) {
      getSkillsProgress(session.user.id);
    }
  }, [session?.user?.id]);

  const masteredSkills = skillsProgress?.filter((skill) => skill.progress === 100 && skill.proficiency >= 70).length;
  const inProgressSkills = skillsProgress?.filter((skill) => skill.progress < 100);
  const skillsToLearn = skillsProgress?.filter((skill) => skill.progress === 0);
  const topSkills = skillsProgress?.filter((skill) => skill.progress > 0)
    .sort((a, b) => b.proficiency - a.proficiency).slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
        Your Skills Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { title: "Total Skills", icon: Book, value: skillsProgress?.length, color: "#58CC02" },
          { title: "Mastered Skills", icon: Star, value: masteredSkills, color: "#1CB0F6" },
          { title: "Skills in Progress", icon: TrendingUp, value: inProgressSkills?.length, color: "#8A2EFF" },
          { title: "Skills to Learn", icon: Target, value: skillsToLearn?.length, color: "#FF9600" },
        ].map((stat, index) => (
          <Card key={index} className="bg-[#1A1A1A] border-[#333333]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value || 0}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 mb-8 bg-[#1A1A1A] border-[#333333]">
        <CardHeader>
          <CardTitle className="text-white">Skills to Acquire</CardTitle>
          <CardDescription className="text-gray-400">
            Based on your career goal: {profile?.careerPath}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skillsToLearn && skillsToLearn.length > 0 ? (
              skillsToLearn?.map((skill, index) => (
                <Badge
                  key={index}
                  className="!cursor-pointer bg-[#222222] hover:bg-[#333333] text-white border-[#444444]"
                  onClick={() => router.push(`/dashboard/skills/workshop?skillId=${typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId._id
                    }`)}
                >
                  {typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId.name}
                </Badge>
              ))
            ) : (
              <Text className="text-gray-400">No skills to learn</Text>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/skills/workshop" className="w-full">
            <Button
              className="w-full bg-[#8A2EFF] hover:bg-[#7325D4] text-white"
              variant="outline"
            >
              Start Learning a New Skill
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-[#1A1A1A] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-white">Top Skills</CardTitle>
            <CardDescription className="text-gray-400">Your most proficient skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSkills?.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <Link href={`/dashboard/skills/workshop?skillId=${typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId._id
                      }`}>
                      <Badge
                        className="cursor-pointer bg-[#1CB0F6] hover:bg-[#19A0E3] text-white border-none 
                          transition-all duration-300 hover:scale-105 flex items-center gap-2"
                      >
                        {typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId.name}
                        <RefreshCcw className="h-3 w-3" />
                      </Badge>
                    </Link>
                    <span className="text-sm font-medium text-[#58CC02]">{skill.proficiency}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1A1A] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-white">Skills in Progress</CardTitle>
            <CardDescription className="text-gray-400">Skills you're currently improving</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inProgressSkills && inProgressSkills.length > 0 ? (
                inProgressSkills?.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-white">
                        {typeof skill.skillModuleId === 'string' ? skill.skillModuleId : skill.skillModuleId.name}
                      </span>
                      <span className="text-sm font-medium text-[#1CB0F6]">{skill.progress}%</span>
                    </div>
                    <Progress
                      value={skill.progress}
                      className="w-full bg-[#222222] [&>div]:bg-gradient-to-r [&>div]:from-[#58CC02] [&>div]:to-[#1CB0F6]"
                    />
                  </div>
                ))
              ) : (
                <Text className="text-gray-400">No skills in progress</Text>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
