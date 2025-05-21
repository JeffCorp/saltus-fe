'use client'

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type SpeechRecognition = any;

import { ResumeEditModal } from "@/components/resume/ResumeEditModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useMockInterview, useMockInterviewFeedback, useMockInterviewTechnical } from "@/services/useMockInterview";
import { useResumeAnalysis } from '@/services/useResumeOptimization';
import { useTextRecognition } from "@/services/useTextRecognition";
import { useTTS } from "@/services/useTTS";
import { ResumeData } from "@/types/resume";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner } from "@chakra-ui/react";
import { FileText, Mic, Video } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function InterviewPreparation() {
  const [jobDescription, setJobDescription] = useState<string>('')
  const [isInterviewQuestionOpens, setIsInterviewQuestionOpens] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<any>('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [userResponses, setUserResponses] = useState<string[]>([])
  const [currentResponse, setCurrentResponse] = useState<string>('')
  const [responseType, setResponseType] = useState<'text' | 'voice'>('text')
  const [isTestComplete, setIsTestComplete] = useState<boolean>(false)
  const { speak } = useTTS();
  const { mutate, isPending, data } = useMockInterview({
    onSuccess: (data) => {
      console.log(data);
      if (data.length > 0) {
        setIsInterviewQuestionOpens(true)
        setCurrentQuestionIndex(0)
        setUserResponses(new Array(data.length).fill(''))
        speak(data[0].question)
      }
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
        setCurrentQuestionIndex(0)
        setUserResponses(new Array(data.length).fill(''))
        speak(data[0].question)
      }
      // setFeedback(data)
    },
    onError: (error) => {
      setFeedback(error.message)
    }
  })
  const { mutate: mutateFeedback, isPending: isPendingFeedback, data: dataFeedback } = useMockInterviewFeedback({
    onSuccess: (data) => {
      console.log(data);
      setFeedback(data)
    },
    onError: (error) => {
      setFeedback(error.message)
    }
  })
  const { isRecording, startRecording: handleStartRecording, stopRecording: handleStopRecording } = useTextRecognition({
    onTranscriptChange: (transcript: string) => {
      // setCurrentResponse(transcript)
      console.log(transcript)
    }
  });

  // Add new state for intro modal
  const [showIntroModal, setShowIntroModal] = useState(true);

  // Add new state for resume edit modal
  const [showResumeEditModal, setShowResumeEditModal] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  const { mutate: optimizeResume, isPending: isOptimizing } = useResumeAnalysis({
    onSuccess: (data) => {
      console.log(data);
      setResumeData(data);
      setShowResumeEditModal(true);
    },
    onError: (error) => {
      setFeedback(error.message)
    }
  });

  const handleSaveResume = (data: ResumeData) => {
    // Handle saving the resume data
    console.log('Saving resume data:', data);
    // Add your save logic here
  };

  useEffect(() => {
    if (showIntroModal) {
      speak('Hello, and welcome to the AI mock interview. My name is Sal. I am a recruiter and I will be your interviewer today.');
    }
  }, [showIntroModal]);

  const handleStartMockInterview = () => {
    setFeedback("Mock interview started. AI is analyzing your responses...")
    mutate(jobDescription)
  }

  const handleStartMockInterviewTechnical = () => {
    setFeedback("Mock technical interview started. AI is analyzing your responses...")
    mutateTechnical(jobDescription)
  }

  const handleAnalyzeCommunication = () => {
    setFeedback("Analyzing your communication skills and body language...")
  }

  const handleOptimizeResume = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const resumeFile = (form.elements.namedItem('resume') as HTMLInputElement).files?.[0];
    const jobDesc = (form.elements.namedItem('job-description') as HTMLTextAreaElement).value;

    if (!resumeFile || !jobDesc) {
      return;
    }

    try {
      await optimizeResume({ resume: resumeFile, jobDescription: jobDesc });
    } catch (error) {
      console.error('Failed to optimize resume:', error);
    }
  };

  const handleNextQuestion = () => {
    if (!data) return;

    const newResponses = [...userResponses];
    newResponses[currentQuestionIndex] = currentResponse;
    setUserResponses(newResponses);

    if (currentQuestionIndex < data.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentResponse('');
      handleStopRecording();
      speak(data[nextIndex].question);
    } else {
      setIsTestComplete(true);
    }
  }

  const handlePreviousQuestion = () => {
    if (!data || currentQuestionIndex <= 0) return;

    const newResponses = [...userResponses];
    newResponses[currentQuestionIndex] = currentResponse;
    setUserResponses(newResponses);

    const prevIndex = currentQuestionIndex - 1;
    setCurrentQuestionIndex(prevIndex);
    setCurrentResponse(userResponses[prevIndex]);
    speak(data[prevIndex].question);
  }

  // Add new function to handle interview completion
  const handleInterviewComplete = () => {
    const feedbackPayload = data?.map((item: any, index: any) => ({
      question: item.question,
      answer: userResponses[index]
    })) || [];

    mutateFeedback(feedbackPayload);
    setIsInterviewQuestionOpens(false);
  };

  return (
    <div className="min-h-screen dark:bg-[#111111] bg-white py-8">
      {/* Add the intro modal */}
      <Modal isOpen={showIntroModal} onClose={() => setShowIntroModal(false)} size="lg">
        <ModalOverlay />
        <ModalContent className="dark:bg-[#1A1A1A] bg-white dark:border-[#333333] border-gray-200 rounded-lg pb-[50px]">
          <ModalHeader className="text-center">
            <ModalCloseButton className="dark:text-white text-black" />
          </ModalHeader>
          <ModalBody className="flex flex-col items-center gap-6 py-8">
            <div className="w-32 h-32 rounded-full bg-[#8A2EFF] flex items-center justify-center">
              {/* You can replace this with an actual image */}
              <svg
                className="w-20 h-20 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold dark:text-white text-black mb-2">Meet Sal, Your AI Interviewer</h2>
              <p className="dark:text-gray-300 text-gray-600">
                I'll be conducting your mock interview today. I'll ask you relevant questions based on the job description you provide and give you detailed feedback on your responses.
              </p>
            </div>
            <Button
              onClick={() => setShowIntroModal(false)}
              className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white mt-4"
            >
              Let's Get Started
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
          Interview Preparation
        </h1>

        <Tabs defaultValue="mock-interview" className="space-y-4">
          <TabsList className="dark:bg-[#1A1A1A] bg-gray-100">
            <TabsTrigger value="mock-interview" className="dark:text-white text-black">
              AI Mock Interview
            </TabsTrigger>
            <TabsTrigger value="technical-interview" className="dark:text-white text-black">
              AI Mock Technical Interview
            </TabsTrigger>
            <TabsTrigger value="communication" className="dark:text-white text-black">
              Communication Analysis
            </TabsTrigger>
            <TabsTrigger value="resume" className="dark:text-white text-black">
              Resume Optimization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mock-interview">
            <Card className="dark:bg-[#1A1A1A] bg-gray-100 dark:border-[#333333] border-gray-200">
              <CardHeader>
                <CardTitle className="dark:text-white text-black">AI-Driven Mock Interview</CardTitle>
                <CardDescription className="dark:text-gray-300 text-gray-600">Practice interviews tailored to specific roles</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role" className="dark:!text-gray-300 !text-gray-700" style={{ color: '#8A2EFF' }}>Paste Job Description</Label>
                    <Textarea
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="dark:bg-[#222222] bg-white dark:border-[#444444] border-gray-50 dark:text-white text-black placeholder:text-gray-500 min-h-[100px]"
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
                <ModalBody className="flex flex-col gap-4">
                  {isTestComplete ? (
                    <div className="text-center py-8">
                      <h2 className="text-2xl font-bold text-white mb-4">Interview Complete!</h2>
                      <p className="text-gray-300 mb-4">You have completed all the questions. Would you like to submit for feedback?</p>
                      <div className="space-x-4">
                        <Button
                          onClick={handleInterviewComplete}
                          className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white"
                        >
                          Submit for Feedback
                        </Button>
                        <Button
                          onClick={() => setIsInterviewQuestionOpens(false)}
                          className="bg-[#333333] hover:bg-[#444444] text-white"
                        >
                          Close Without Feedback
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl font-bold text-white">Interview Question {currentQuestionIndex + 1}/{data?.length}</h1>
                      {data && data[currentQuestionIndex] && (
                        <>
                          <div className="bg-[#222222] p-4 rounded-lg">
                            <p className="text-white font-bold">{data[currentQuestionIndex].question}</p>
                          </div>

                          <div className="flex gap-2 mb-2">
                            <Button
                              onClick={() => {
                                setResponseType('text');
                                handleStopRecording();
                              }}
                              className={`${responseType === 'text' ? 'bg-[#8A2EFF]' : 'bg-[#333333]'} text-white`}
                            >
                              Text Response
                            </Button>
                            <Button
                              onClick={() => {
                                setResponseType('voice');
                                handleStartRecording();
                              }}
                              className={`${responseType === 'voice' ? '!bg-[#333333]' : 'bg-[#8A2EFF]'} text-white`}
                            >
                              Voice Response
                            </Button>
                          </div>

                          {responseType === 'text' ? (
                            <Textarea
                              value={currentResponse}
                              onChange={(e) => setCurrentResponse(e.target.value)}
                              placeholder="Type your response here..."
                              className="bg-[#222222] border-[#444444] text-white placeholder:text-gray-500 min-h-[150px]"
                            />
                          ) : (
                            <div className="bg-[#222222] p-10 rounded-lg">
                              <div className="text-center mb-4">
                                <div className="relative inline-block">
                                  <Button
                                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                                    className={`${isRecording ? 'bg-red-500' : 'bg-[#8A2EFF]'} text-white relative z-10 p-2 rounded-full !h-auto!w-10 flex items-center justify-center`}
                                  >
                                    <Mic className="w-auto h-auto" />
                                  </Button>
                                  {isRecording && (
                                    <div className="absolute inset-0 z-0">
                                      <div className="absolute inset-0 animate-ping rounded-full bg-[#333333]  opacity-75"></div>
                                    </div>
                                  )}
                                </div>
                                {isRecording && (
                                  <p className="text-gray-300 mt-2">Recording in progress... Speak clearly into your microphone.</p>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <Button
                              onClick={handlePreviousQuestion}
                              disabled={currentQuestionIndex === 0}
                              className="bg-[#333333] hover:bg-[#444444] text-white"
                            >
                              Previous Question
                            </Button>
                            <Button
                              onClick={handleNextQuestion}
                              disabled={currentQuestionIndex === data.length - 1 && !currentResponse}
                              className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white"
                            >
                              {currentQuestionIndex === data.length - 1 ? 'Complete Interview' : 'Next Question'}
                            </Button>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
          </TabsContent>
          <TabsContent value="technical-interview">
            <Card className="dark:bg-[#1A1A1A] bg-white dark:border-[#333333] border-gray-200">
              <CardHeader>
                <CardTitle className="dark:text-white text-black">AI Mock Technical Interview</CardTitle>
                <CardDescription className="dark:text-gray-300 text-gray-600">Practice technical interviews tailored to specific roles</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role" className="dark:text-gray-300 text-gray-700" style={{ color: '#8A2EFF' }}>Paste Job Description</Label>
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
                <ModalBody className="flex flex-col gap-4">
                  {isTestComplete ? (
                    <div className="text-center py-8">
                      <h2 className="text-2xl font-bold text-white mb-4">Interview Complete!</h2>
                      <p className="text-gray-300 mb-4">You have completed all the questions. Would you like to submit for feedback?</p>
                      <div className="space-x-4">
                        <Button
                          onClick={handleInterviewComplete}
                          className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white"
                        >
                          Submit for Feedback
                        </Button>
                        <Button
                          onClick={() => setIsInterviewQuestionOpens(false)}
                          className="bg-[#333333] hover:bg-[#444444] text-white"
                        >
                          Close Without Feedback
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl font-bold text-white">Interview Question {currentQuestionIndex + 1}/{dataTechnical?.length}</h1>
                      {dataTechnical && dataTechnical[currentQuestionIndex] && (
                        <>
                          <div className="bg-[#222222] p-4 rounded-lg">
                            <p className="text-white font-bold">{dataTechnical[currentQuestionIndex].question}</p>
                          </div>

                          <div className="flex gap-2 mb-2">
                            <Button
                              onClick={() => setResponseType('text')}
                              className={`${responseType === 'text' ? 'bg-[#8A2EFF]' : 'bg-[#333333]'} text-white`}
                            >
                              Text Response
                            </Button>
                            <Button
                              onClick={() => setResponseType('voice')}
                              className={`${responseType === 'voice' ? 'bg-[#333333]' : 'bg-[#8A2EFF]'} text-white`}
                            >
                              Voice Response
                            </Button>
                          </div>

                          {responseType === 'text' ? (
                            <Textarea
                              value={currentResponse}
                              onChange={(e) => setCurrentResponse(e.target.value)}
                              placeholder="Type your response here..."
                              className="bg-[#222222] border-[#444444] text-white placeholder:text-gray-500 min-h-[150px]"
                            />
                          ) : (
                            <div className="bg-[#222222] p-4 rounded-lg">
                              <div className="text-center mb-4">
                                <div className="relative inline-block">
                                  <Button
                                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                                    className={`${isRecording ? 'bg-red-500' : 'bg-[#8A2EFF]'} text-white relative z-10`}
                                  >
                                    <Mic className="w-4 h-4 mr-2" />
                                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                                  </Button>
                                  {isRecording && (
                                    <div className="absolute inset-0 z-0">
                                      <div className="absolute inset-0 animate-ping rounded-md bg-red-500 opacity-75"></div>
                                    </div>
                                  )}
                                </div>
                                {isRecording && (
                                  <p className="text-gray-300 mt-2">Recording in progress... Speak clearly into your microphone.</p>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <Button
                              onClick={handlePreviousQuestion}
                              disabled={currentQuestionIndex === 0}
                              className="bg-[#333333] hover:bg-[#444444] text-white"
                            >
                              Previous Question
                            </Button>
                            <Button
                              onClick={handleNextQuestion}
                              disabled={currentQuestionIndex === data.length - 1 && !currentResponse}
                              className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white"
                            >
                              {currentQuestionIndex === data.length - 1 ? 'Complete Interview' : 'Next Question'}
                            </Button>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
          </TabsContent>
          <TabsContent value="communication">
            <Card className="dark:bg-[#1A1A1A] bg-white dark:border-[#333333] border-gray-200">
              <CardHeader>
                <CardTitle className="dark:text-white text-black">Communication Skills Analysis</CardTitle>
                <CardDescription className="dark:text-gray-300 text-gray-600">Get feedback on your communication and body language</CardDescription>
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
            <Card className="dark:bg-[#1A1A1A] bg-white dark:border-[#333333] border-gray-200">
              <CardHeader>
                <CardTitle className="dark:text-white text-black">Resume Optimization</CardTitle>
                <CardDescription className="dark:text-gray-300 text-gray-600">Get AI-powered suggestions to improve your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleOptimizeResume} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resume" className="dark:text-gray-300 text-gray-700">
                      Upload Your Resume (PDF)
                    </Label>
                    <Input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf"
                      required
                      className="dark:bg-[#222222] bg-white dark:border-[#444444] border-gray-200 dark:text-white text-black file:bg-[#333333] file:text-white file:border-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-description" className="dark:text-gray-300 text-gray-700">
                      Paste Job Description
                    </Label>
                    <Textarea
                      id="job-description"
                      name="job-description"
                      required
                      placeholder="Paste the job description here..."
                      className="dark:bg-[#222222] bg-white dark:border-[#444444] border-gray-200 dark:text-white text-black placeholder:text-gray-500 min-h-[100px]"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isOptimizing}
                    className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {isOptimizing ? 'Optimizing...' : 'Optimize Resume'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {feedback && (
          <Card className="mt-8 dark:bg-[#1A1A1A] bg-white dark:border-[#333333] border-gray-200">
            <CardHeader>
              <CardTitle className="dark:text-white text-black text-xl">Interview Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {typeof feedback === 'object' ? (
                <>
                  <div className="space-y-4">
                    <div className="border-b border-[#333333] pb-4">
                      <h3 className="text-lg font-semibold text-white mb-2">Communication</h3>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-sm text-gray-400">Score:</div>
                        <div className="flex-1 h-2 bg-[#222222] rounded">
                          <div
                            className="h-full bg-[#8A2EFF] rounded"
                            style={{ width: `${(feedback.evaluation.communication.score / 10) * 100}%` }}
                          />
                        </div>
                        <div className="text-white">{feedback.evaluation.communication.score}/10</div>
                      </div>
                      <p className="text-gray-300">{feedback.evaluation.communication.feedback}</p>
                    </div>

                    <div className="border-b border-[#333333] pb-4">
                      <h3 className="text-lg font-semibold text-white mb-2">Technical Skills</h3>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-sm text-gray-400">Score:</div>
                        <div className="flex-1 h-2 bg-[#222222] rounded">
                          <div
                            className="h-full bg-[#8A2EFF] rounded"
                            style={{ width: `${(feedback.evaluation.technical_skills.score / 10) * 100}%` }}
                          />
                        </div>
                        <div className="text-white">{feedback.evaluation.technical_skills.score}/10</div>
                      </div>
                      <p className="text-gray-300">{feedback.evaluation.technical_skills.feedback}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Overall Performance</h3>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-sm text-gray-400">Score:</div>
                        <div className="flex-1 h-2 bg-[#222222] rounded">
                          <div
                            className="h-full bg-[#8A2EFF] rounded"
                            style={{ width: `${(feedback.evaluation.overall_performance.score / 10) * 100}%` }}
                          />
                        </div>
                        <div className="text-white">{feedback.evaluation.overall_performance.score}/10</div>
                      </div>
                      <p className="text-gray-300">{feedback.evaluation.overall_performance.feedback}</p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="dark:text-gray-300 text-gray-600">{feedback}</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add ResumeEditModal */}
      {showResumeEditModal && resumeData && (
        <ResumeEditModal
          isOpen={showResumeEditModal}
          onClose={() => setShowResumeEditModal(false)}
          data={resumeData}
          onSave={handleSaveResume}
        />
      )}
    </div>
  )
}