'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
<<<<<<< Updated upstream
=======
import { useMockInterview, useMockInterviewTechnical } from "@/services/useMockInterview"
import useTTS from "@/services/useTTS"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner } from "@chakra-ui/react"
>>>>>>> Stashed changes
import { FileText, Mic, Video } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function InterviewPreparation() {
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [feedback, setFeedback] = useState<string>('')
<<<<<<< Updated upstream
=======
  const { speak } = useTTS();
  const { mutate, isPending, data } = useMockInterview({
    onSuccess: (data) => {
      console.log(data);
      if (data.length > 0) {
        setIsInterviewQuestionOpens(true)
      }
      // setFeedback(data)
    },
    onError: (error) => {
      setFeedback(error.message)
    }
  })
  const { mutate: mutateTechnical, isPending: isPendingTechnical, data: dataTechnical } = useMockInterviewTechnical({
    onSuccess: (data) => {
      console.log(data);
      if (data.length > 0) {
        setIsInterviewQuestionOpens(true)
      }
      // setFeedback(data)
    },
    onError: (error) => {
      setFeedback(error.message)
    }
  })

  useEffect(() => {
    speak('Hello, world!');
  }, []);
>>>>>>> Stashed changes

  const handleStartMockInterview = () => {
    // Placeholder for starting mock interview
    setFeedback("Mock interview started. AI is analyzing your responses...")
  }

  const handleStartMockInterviewTechnical = () => {
    setFeedback("Mock technical interview started. AI is analyzing your responses...")
    mutateTechnical(jobDescription)
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
<<<<<<< Updated upstream
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
=======
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
            <TabsTrigger value="technical-interview" className="data-[state=active]:bg-[#222222] text-white">
              AI Mock Technical Interview
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
                    <Label htmlFor="role" className="dark:text-gray-300 text-gray-700">Paste Job Description</Label>
                    <Textarea
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="bg-[#222222] border-[#444444] text-white placeholder:text-gray-500 min-h-[100px]"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleStartMockInterview}
                  disabled={!jobDescription}
                  className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white disabled:bg-[#333333] flex items-center gap-2"
                >
                  Start Mock Interview {isPending ? <Spinner size="sm" /> : null}
                </Button>
              </CardFooter>
            </Card>
            <Modal isOpen={isInterviewQuestionOpens} onClose={() => setIsInterviewQuestionOpens(false)} size="4xl">
              <ModalOverlay />
              <ModalContent className="dark:bg-[#1A1A1A] bg-white dark:border-[#333333] border-gray-50 rounded-lg h-[80vh]">
                <ModalHeader>
                  <ModalCloseButton />
                </ModalHeader>
                <ModalBody className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold text-white">Possible Interview Questions</h1>
                  <div className="flex flex-col gap-4 overflow-y-auto h-[60vh]">
                    {
                      (dataTechnical || data)?.length > 0 &&
                      (dataTechnical || data)?.map((question: { question: string; answer: string }, index: number) => (
                        <div key={index}>
                          <p className="dark:text-white text-gray-700 font-bold">{question.question}</p>
                          <p className="dark:text-white text-gray-700">{question.answer}</p>
                        </div>
                      ))
                    }
                  </div>
                </ModalBody>
              </ModalContent>
            </Modal>
          </TabsContent>
          <TabsContent value="technical-interview">
            <Card className="bg-[#1A1A1A] border-[#333333]">
              <CardHeader>
                <CardTitle className="text-white">AI Mock Technical Interview</CardTitle>
                <CardDescription className="text-gray-400">Practice technical interviews tailored to specific roles</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role" className="dark:text-gray-300 text-gray-700">Paste Job Description</Label>
                    <Textarea
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="bg-[#222222] border-[#444444] text-white placeholder:text-gray-500 min-h-[100px]"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleStartMockInterviewTechnical}
                  disabled={!jobDescription}
                  className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white disabled:bg-[#333333] flex items-center gap-2"
                >
                  Start Mock Interview {isPending ? <Spinner size="sm" /> : null}
                </Button>
              </CardFooter>
            </Card>
            <Modal isOpen={isInterviewQuestionOpens} onClose={() => setIsInterviewQuestionOpens(false)} size="4xl">
              <ModalOverlay />
              <ModalContent className="dark:bg-[#1A1A1A] bg-white dark:border-[#333333] border-gray-50 rounded-lg h-[80vh]">
                <ModalHeader>
                  <ModalCloseButton />
                </ModalHeader>
                <ModalBody className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold text-white">Possible Interview Questions</h1>
                  <div className="flex flex-col gap-4 overflow-y-auto h-[60vh]">
                    {
                      (dataTechnical)?.length > 0 &&
                      (dataTechnical)?.map((question: { question: string; answer: string }, index: number) => (
                        <div key={index}>
                          <p className="dark:text-white text-gray-700 font-bold">{question.question}</p>
                          <p className="dark:text-white text-gray-700">{question.answer}</p>
                        </div>
                      ))
                    }
                  </div>
                </ModalBody>
              </ModalContent>
            </Modal>
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
>>>>>>> Stashed changes
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