'use client'

import { NewProjectSimulation } from "@/components/projects/newProject"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Brain, Briefcase, CheckCircle2, Clock, TrendingUp, Users, Users2 } from "lucide-react"
import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

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

export default function Component() {
  const [selectedScenario, setSelectedScenario] = useState<{ title: string; description: string } | null>(null)
  // const [isDeveloping, setIsDeveloping] = useState(true);

  // if (isDeveloping) {
  //   return (
  //     <Box style={{ padding: "20px" }}>
  //       <h3>Coming soon</h3>
  //     </Box>
  //   )
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Real-World Project Simulations</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Collaborations</CardTitle>
            <Users2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsData.reduce((acc, curr) => acc + curr.collaborations, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Experience Gained</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsData.reduce((acc, curr) => acc + curr.timeSpent, 0)} hours</div>
          </CardContent>
        </Card>
      </div>

      {projectsData.map((project) => (
        <Card key={project.id} className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{project.name}</CardTitle>
              <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>{project.status}</Badge>
            </div>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Project Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="w-full" />
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Deadline: {new Date(project.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  <span>{project.team.length} team members</span>
                </div>
              </div>
              <div className="flex -space-x-2">
                {project.team.map((member, index) => (
                  <Avatar key={index} className="border-2 border-background">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    <span>{project.tasks.completed} tasks completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users2 className="h-4 w-4 text-muted-foreground" />
                    <span>{project.collaborations} collaborations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-muted-foreground" />
                    <span>{project.insights} insights generated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{project.timeSpent} hours of experience</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tasks">
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[project.tasks]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completed" stackId="a" fill="#4ade80" />
                      <Bar dataKey="inProgress" stackId="a" fill="#facc15" />
                      <Bar dataKey="notStarted" stackId="a" fill="#f87171" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-2 flex justify-between text-sm">
                    <div className="flex items-center">
                      <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                      <span>Completed: {project.tasks.completed}</span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="mr-1 h-4 w-4 text-yellow-500" />
                      <span>In Progress: {project.tasks.inProgress}</span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="mr-1 h-4 w-4 text-red-500" />
                      <span>Not Started: {project.tasks.notStarted}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="collaboration">
                <div className="mt-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={project.team[0].avatar} alt={project.team[0].name} />
                      <AvatarFallback>{project.team[0].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{project.team[0].name} shared a new idea</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={project.team[1].avatar} alt={project.team[1].name} />
                      <AvatarFallback>{project.team[1].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{project.team[1].name} started a group discussion</p>
                      <p className="text-sm text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={project.team[2].avatar} alt={project.team[2].name} />
                      <AvatarFallback>{project.team[2].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{project.team[2].name} provided feedback on a task</p>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="insights">
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                      { name: 'Week 1', insights: 2 },
                      { name: 'Week 2', insights: 3 },
                      { name: 'Week 3', insights: 1 },
                      { name: 'Week 4', insights: 2 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="insights" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="mt-2  text-sm text-center">Insights generated per week (last 4 weeks)</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardFooter>
        </Card>
      ))}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>AI-Generated Scenarios</CardTitle>
          <CardDescription>Test your problem-solving skills with real-world challenges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiScenarios.map((scenario, index) => (
              <Card key={index} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedScenario(scenario)}>
                <CardHeader>
                  <CardTitle className="text-lg">{scenario.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{scenario.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedScenario} onOpenChange={() => setSelectedScenario(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedScenario?.title}</DialogTitle>
            <DialogDescription>{selectedScenario?.description}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Your Response:</h4>
            <textarea
              className="w-full h-32 p-2 border rounded-md"
              placeholder="Type your solution here..."
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setSelectedScenario(null)}>Cancel</Button>
            <Button onClick={() => {
              // Here you would typically send the response to be evaluated
              alert("Response submitted for evaluation!")
              setSelectedScenario(null)
            }}>Submit for Evaluation</Button>
          </div>
        </DialogContent>
      </Dialog>

      <NewProjectSimulation />
      {/* <div className="mt-8 flex justify-center">
        <Button>Start a New Project Simulation</Button>
      </div> */}
    </div>
  )
}