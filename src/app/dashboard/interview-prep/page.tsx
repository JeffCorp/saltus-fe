'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Mic, Video } from 'lucide-react'
import { useState } from 'react'

export default function InterviewPreparation() {
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [feedback, setFeedback] = useState<string>('')

  const handleStartMockInterview = () => {
    setFeedback("Mock interview started. AI is analyzing your responses...")
  }

  const handleAnalyzeCommunication = () => {
    setFeedback("Analyzing your communication skills and body language...")
  }

  const handleOptimizeResume = () => {
    setFeedback("Analyzing your resume and generating optimization suggestions...")
  }

  return (
    <div className="min-h-screen bg-[#111111] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
          Interview Preparation
        </h1>

        <Tabs defaultValue="mock-interview" className="space-y-4">
          <TabsList className="bg-[#1A1A1A] border-[#333333]">
            <TabsTrigger value="mock-interview" className="data-[state=active]:bg-[#222222] text-white">
              AI Mock Interview
            </TabsTrigger>
            <TabsTrigger value="communication" className="data-[state=active]:bg-[#222222] text-white">
              Communication Analysis
            </TabsTrigger>
            <TabsTrigger value="resume" className="data-[state=active]:bg-[#222222] text-white">
              Resume Optimization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mock-interview">
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader>
                <CardTitle className="text-white">AI-Driven Mock Interview</CardTitle>
                <CardDescription className="text-gray-400">Practice interviews tailored to specific roles</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-gray-300">Select Role</Label>
                    <Select
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="bg-[#222222] border-[#444444] text-white"
                    >
                      <option value="">Choose a role</option>
                      <option value="software-engineer">Software Engineer</option>
                      <option value="data-scientist">Data Scientist</option>
                      <option value="product-manager">Product Manager</option>
                      <option value="ux-designer">UX Designer</option>
                    </Select>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleStartMockInterview}
                  disabled={!selectedRole}
                  className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white disabled:bg-[#333333]"
                >
                  Start Mock Interview
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="communication">
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader>
                <CardTitle className="text-white">Communication Skills Analysis</CardTitle>
                <CardDescription className="text-gray-400">Get feedback on your communication and body language</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-[#222222] hover:bg-[#333333] text-white border border-[#444444]">
                    <Mic className="w-4 h-4 mr-2" />
                    Record Audio
                  </Button>
                  <Button className="bg-[#222222] hover:bg-[#333333] text-white border border-[#444444]">
                    <Video className="w-4 h-4 mr-2" />
                    Record Video
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleAnalyzeCommunication}
                  className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white"
                >
                  Analyze Communication
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="resume">
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader>
                <CardTitle className="text-white">Resume Optimization</CardTitle>
                <CardDescription className="text-gray-400">Get AI-powered suggestions to improve your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resume" className="text-gray-300">Upload Your Resume</Label>
                  <Input
                    id="resume"
                    type="file"
                    className="bg-[#222222] border-[#444444] text-white file:bg-[#333333] file:text-white file:border-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-description" className="text-gray-300">Paste Job Description</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Paste the job description here..."
                    className="bg-[#222222] border-[#444444] text-white placeholder:text-gray-500 min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleOptimizeResume}
                  className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Optimize Resume
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {feedback && (
          <Card className="mt-8 bg-[#1A1A1A] border-[#333333]">
            <CardHeader>
              <CardTitle className="text-white text-xl">Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">{feedback}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}