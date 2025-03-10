'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Box } from "@chakra-ui/react"
import { FileText, Mic, Video } from 'lucide-react'
import { useState } from 'react'

export default function InterviewPreparation() {
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [feedback, setFeedback] = useState<string>('')
  const [isDeveloping, setIsDeveloping] = useState(false);

  if (isDeveloping) {
    return (
      <Box style={{ padding: "20px" }}>
        <h3>Coming soon</h3>
      </Box>
    )
  }

  const handleStartMockInterview = () => {
    // Placeholder for starting mock interview
    setFeedback("Mock interview started. AI is analyzing your responses...")
  }

  const handleAnalyzeCommunication = () => {
    // Placeholder for communication analysis
    setFeedback("Analyzing your communication skills and body language...")
  }

  const handleOptimizeResume = () => {
    // Placeholder for resume optimization
    setFeedback("Analyzing your resume and generating optimization suggestions...")
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white !min-h-[90vh]">
      <h1 className="text-3xl font-bold mb-6">Interview Preparation</h1>
      <Tabs defaultValue="mock-interview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="mock-interview">AI Mock Interview</TabsTrigger>
          <TabsTrigger value="communication">Communication Analysis</TabsTrigger>
          <TabsTrigger value="resume">Resume Optimization</TabsTrigger>
        </TabsList>
        <TabsContent value="mock-interview">
          <Card>
            <CardHeader>
              <CardTitle>AI-Driven Mock Interview</CardTitle>
              <CardDescription>Practice interviews tailored to specific roles</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Select Role</Label>
                  <Select onChange={(e) => setSelectedRole(e.target.value)} aria-placeholder="Choose a role">
                    <option>Choose a role</option>
                    <option value="software-engineer">Software Engineer</option>
                    <option value="data-scientist">Data Scientist</option>
                    <option value="product-manager">Product Manager</option>
                    <option value="ux-designer">UX Designer</option>
                  </Select>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStartMockInterview} disabled={!selectedRole}>
                Start Mock Interview
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="communication">
          <Card>
            <CardHeader>
              <CardTitle>Communication Skills Analysis</CardTitle>
              <CardDescription>Get feedback on your communication and body language</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button className="flex items-center justify-center gap-2">
                  <Mic className="w-4 h-4" />
                  Record Audio
                </Button>
                <Button className="flex items-center justify-center gap-2">
                  <Video className="w-4 h-4" />
                  Record Video
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAnalyzeCommunication}>Analyze Communication</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="resume">
          <Card>
            <CardHeader>
              <CardTitle>Resume Optimization</CardTitle>
              <CardDescription>Get AI-powered suggestions to improve your resume</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="resume">Upload Your Resume</Label>
                <Input id="resume" type="file" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-description">Paste Job Description</Label>
                <Textarea id="job-description" placeholder="Paste the job description here..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleOptimizeResume} className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Optimize Resume
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      {feedback && (
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Feedback</h2>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  )
}