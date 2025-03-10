'use client'

import { NewProjectSimulation } from "@/components/projects/newProject"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useGetProject } from "@/services/useProjects"
import { useDisclosure } from "@chakra-ui/react"
import { Briefcase, Clock, TrendingUp, Users2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react'

// Mock data - In a real application, this would come from a backend API
const projectsData = [
  {
    id: 1,
    name: "Sustainable Urban Planning Initiative",
    description: "Develop innovative solutions for sustainable urban development, addressing challenges in transportation, energy efficiency, and green spaces.",
    progress: 75,
    status: "In Progress",
    dueDate: "2024-08-15",
    team: [
      { name: "Emma Green", role: "Urban Planner", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Liam Chen", role: "Environmental Scientist", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Sophia Patel", role: "Community Engagement Specialist", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    tasks: {
      total: 20,
      completed: 15,
      inProgress: 3,
      notStarted: 2
    },
    collaborations: 12,
    insights: 8,
    timeSpent: 240, // hours
  },
  {
    id: 2,
    name: "Global Health Crisis Management",
    description: "Create a comprehensive strategy to address global health crises, focusing on rapid response, resource allocation, and public communication.",
    progress: 40,
    status: "In Progress",
    dueDate: "2024-10-30",
    team: [
      { name: "Dr. Olivia Martinez", role: "Epidemiologist", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "James Kim", role: "Public Health Specialist", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Aisha Nkosi", role: "Crisis Communication Expert", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    tasks: {
      total: 25,
      completed: 10,
      inProgress: 8,
      notStarted: 7
    },
    collaborations: 18,
    insights: 15,
    timeSpent: 180, // hours
  },
  {
    id: 3,
    name: "Inclusive Education Technology Platform",
    description: "Develop an innovative educational platform that caters to diverse learning needs, incorporating adaptive learning algorithms and accessibility features.",
    progress: 90,
    status: "Nearly Complete",
    dueDate: "2024-06-30",
    team: [
      { name: "Alex Turner", role: "EdTech Specialist", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Maya Singh", role: "Curriculum Designer", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Carlos Mendoza", role: "Accessibility Expert", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    tasks: {
      total: 30,
      completed: 27,
      inProgress: 2,
      notStarted: 1
    },
    collaborations: 22,
    insights: 19,
    timeSpent: 320, // hours
  },
]

const aiScenarios = [
  {
    title: "Unexpected Budget Cut",
    description: "Your project's budget has been unexpectedly cut by 30%. How do you adjust your plans while still meeting key objectives?",
  },
  {
    title: "Stakeholder Disagreement",
    description: "Two major stakeholders have conflicting views on the project's direction. How do you mediate and find a solution?",
  },
  {
    title: "Regulatory Change",
    description: "A new regulation has been introduced that affects your project. How do you ensure compliance while minimizing disruption?",
  },
]

export default function ProjectsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedScenario, setSelectedScenario] = useState<{ title: string; description: string } | null>(null)
  const { data: projects, isPending, mutate: getProjects } = useGetProject()
  const router = useRouter()

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <div className="min-h-screen bg-[#111111] py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
            Your Real-World Project Simulations
          </h1>
          <Button
            onClick={onOpen}
            className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white"
          >
            New Project
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { title: "Active Projects", icon: Briefcase, value: projects?.count || 0, color: "#58CC02" },
            { title: "Team Collaborations", icon: Users2, value: projects?.collaborations || 0, color: "#1CB0F6" },
            { title: "Time Invested", icon: Clock, value: `${projects?.timeSpent || 0}h`, color: "#8A2EFF" },
            { title: "Growth Rate", icon: TrendingUp, value: "+23%", color: "#FF9600" },
          ].map((stat, index) => (
            <Card key={index} className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects?.data?.map((project: any) => (
            <Card
              key={project._id}
              className="bg-[#1A1A1A] border-[#333333] hover:border-[#444444] transition-all cursor-pointer"
              onClick={() => router.push(`/dashboard/projects/${project._id}`)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg font-bold text-white">{project.title}</CardTitle>
                  <Badge className={`
                    ${project.status === 'In Progress' ? 'bg-[#1CB0F6]' :
                      project.status === 'Completed' ? 'bg-[#58CC02]' :
                        'bg-[#FF9600]'} 
                    text-white border-none`}
                  >
                    {project.status}
                  </Badge>
                </div>
                <CardDescription className="text-gray-400 line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{project.progress}%</span>
                    </div>
                    <Progress
                      value={project.progress}
                      className="w-full bg-[#222222] [&>div]:bg-gradient-to-r [&>div]:from-[#58CC02] [&>div]:to-[#1CB0F6]"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {project.team?.slice(0, 3).map((member: any, index: number) => (
                        <Avatar key={index} className="border-2 border-[#1A1A1A]">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-[#8A2EFF] text-white">
                            {member.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team?.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-[#222222] border-2 border-[#1A1A1A] flex items-center justify-center text-sm text-white">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-gray-400">
                      Due {new Date(project.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Project Dialog */}
        <NewProjectSimulation
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={() => {
            onClose()
            getProjects()
          }}
        />
      </div>
    </div>
  )
}