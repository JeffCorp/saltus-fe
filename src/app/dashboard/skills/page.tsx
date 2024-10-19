'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, CheckCircle, Clock, Star, Target, TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// Mock data - In a real application, this would come from a backend API
const skillsData = {
  totalSkills: 28,
  masteredSkills: 12,
  inProgressSkills: 8,
  skillsToLearn: 8,
  careerGoal: "Senior Full Stack Developer",
  skillProgressOverTime: [
    { month: 'Jan', skills: 18 },
    { month: 'Feb', skills: 20 },
    { month: 'Mar', skills: 22 },
    { month: 'Apr', skills: 24 },
    { month: 'May', skills: 26 },
    { month: 'Jun', skills: 28 },
  ],
  topSkills: [
    { name: "JavaScript", proficiency: 90 },
    { name: "React", proficiency: 85 },
    { name: "Node.js", proficiency: 80 },
    { name: "TypeScript", proficiency: 75 },
    { name: "SQL", proficiency: 70 },
  ],
  skillsInProgress: [
    { name: "GraphQL", progress: 60 },
    { name: "Docker", progress: 40 },
    { name: "AWS", progress: 30 },
    { name: "Python", progress: 50 },
  ],
  skillsToAcquire: [
    "Kubernetes",
    "Machine Learning basics",
    "Microservices Architecture",
    "Scala",
  ],
}

export default function SkillsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Skills Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skillsData.totalSkills}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mastered Skills</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skillsData.masteredSkills}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills in Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skillsData.inProgressSkills}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills to Learn</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skillsData.skillsToLearn}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Skill Growth Over Time</CardTitle>
          <CardDescription>Your skill acquisition progress</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={skillsData.skillProgressOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="skills" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Skills</CardTitle>
            <CardDescription>Your most proficient skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillsData.topSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm font-medium">{skill.proficiency}%</span>
                  </div>
                  <Progress value={skill.proficiency} className="w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills in Progress</CardTitle>
            <CardDescription>Skills you're currently improving</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillsData.skillsInProgress.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm font-medium">{skill.progress}%</span>
                  </div>
                  <Progress value={skill.progress} className="w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Skills to Acquire</CardTitle>
          <CardDescription>Based on your career goal: {skillsData.careerGoal}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skillsData.skillsToAcquire.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Start Learning a New Skill</Button>
        </CardFooter>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Skill Development Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="short-term">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="short-term">Short-term</TabsTrigger>
              <TabsTrigger value="mid-term">Mid-term</TabsTrigger>
              <TabsTrigger value="long-term">Long-term</TabsTrigger>
            </TabsList>
            <TabsContent value="short-term">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Complete Advanced React Course</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Start GraphQL Project</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Attend Node.js Workshop</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="mid-term">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Master Docker and Containerization</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Develop Fullstack Project with TypeScript</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Obtain AWS Certification</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="long-term">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Learn Microservices Architecture</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Explore Machine Learning Basics</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Contribute to Open Source Projects</span>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}