'use client'

import { Textarea } from "@/components/ui/textarea"
import { useCareerPath, useSuggestedOccupations, useSuggestedOccupationsByPersonality } from "@/services/useCareerPath"
import { useProfile } from "@/services/useProfile"
import { Box, Button, Card, CardBody, CardHeader, Container, Flex, Heading, Progress, Radio, RadioGroup, Stack, Text, VStack } from "@chakra-ui/react"
import { Brain, Briefcase, BriefcaseConveyorBelt, ChevronLeft, ChevronRight, Lightbulb } from "lucide-react"
import { useRouter } from "next/navigation"
<<<<<<< Updated upstream
import { useState } from 'react'
=======
import { useCallback, useMemo, useState } from 'react'
import { FaGoogle, FaLinkedin, FaYoutube } from "react-icons/fa"
import { SiGlassdoor, SiIndeed, SiQuora, SiReddit, SiWikipedia } from "react-icons/si"

// Constants moved outside component
const STEPS = {
  CHOOSE_PATH: 0,
  OTHER_PATH: 1,
  // INTERESTS: 2,
  OCCUPATIONS: 2
} as const

const STEP_ICONS = {
  [STEPS.CHOOSE_PATH]: BriefcaseConveyorBelt,
  [STEPS.OTHER_PATH]: Briefcase,
  // [STEPS.INTERESTS]: Brain,
  [STEPS.OCCUPATIONS]: Lightbulb
} as const

const STEP_TITLES = {
  [STEPS.CHOOSE_PATH]: "Choose Your Path",
  [STEPS.OTHER_PATH]: "Choose Other Path",
  // [STEPS.INTERESTS]: "Discover Your Interests",
  [STEPS.OCCUPATIONS]: "Explore Occupations"
} as const

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const buttonStyles = {
  base: "p-4 rounded-xl text-left transition-all",
  selected: "bg-[#1CB0F6] text-white hover:bg-[#1890d0]",
  unselected: "bg-gray-50 dark:bg-[#111111] hover:bg-[#1CB0F6]/10 dark:hover:bg-[#1CB0F6]/10 text-gray-900 dark:text-white"
}
>>>>>>> Stashed changes

const personalityQuestions = [
  {
    question: "How do you prefer to work?",
    options: ["Independently", "In a team", "Mix of both"]
  },
  {
    question: "What type of problems do you enjoy solving?",
    options: ["Technical", "Creative", "Analytical", "People-oriented"]
  },
  {
    question: "How do you handle stress?",
    options: ["Thrive under pressure", "Prefer a calm environment", "Adaptable to both"]
  },
  {
    question: "What's your ideal work environment?",
    options: ["Office", "Remote", "Outdoors", "Flexible"]
  }
]

const staticCareerRoles = [
  "Software Developer",
  "Data Scientist",
  "UX Designer",
  "Project Manager",
  "Marketing Specialist",
  "Financial Analyst",
  "Other"
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [selectedCareerPath, setSelectedCareerPath] = useState<string | null>(null)
  const [personalityAnswers, setPersonalityAnswers] = useState<string[]>([])
<<<<<<< Updated upstream
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(null)
  const { profile, isLoading, isError, error, updateProfile, isUpdating } = useProfile()
=======
  const [selectedOccupation, setSelectedOccupation] = useState<{ title: string, description: string } | null>(null)

>>>>>>> Stashed changes
  const router = useRouter()

  const { data: careerPaths, isLoading: isLoadingCareerPaths } = useCareerPath()
  const { data: suggestedOccupations, isLoading: isLoadingSuggestions, refetch } = useSuggestedOccupations(selectedCareerPath)
  const { data: suggestedOccupationsByPersonality, isLoading: isLoadingSuggestionsByPersonality, refetch: refetchSuggestionsByPersonality } = useSuggestedOccupationsByPersonality(personalityAnswers)

  const handleCareerPathSelect = (path: string) => {
    setSelectedCareerPath(path)
    if (path === "Other") {
      setStep(1)
    } else {
      setStep(3)
    }
  }

  const handleCustomCareerPath = () => {
    if (selectedCareerPath) {
      setStep(3)
    } else {
      setStep(2)
    }
  }

  const handlePersonalityAnswer = (answer: string) => {
    setPersonalityAnswers([...personalityAnswers, answer])
    if (personalityAnswers.length === personalityQuestions.length - 1) {
      setStep(3)
    }
  }

  const handleOccupationAnswer = (answer: string) => {
    setSelectedOccupation(answer)
  }

  const handleFinish = () => {
    updateProfile(
      { careerPath: selectedCareerPath || selectedOccupation, projectedRole: selectedOccupation, personalityAnswers, isOnboarded: true },
      {
<<<<<<< Updated upstream
        onSuccess: () => {
          router.push('/dashboard')
        },
        onError: (error) => {
          console.error('Onboarding failed:', error)
          // Handle error (e.g., show an error message to the user)
        },
=======
        careerPath: selectedCareerPath || selectedOccupation,
        projectedRole: selectedOccupation?.title,
        personalityAnswers,
        isOnboarded: true
      },
      {
        onSuccess: () => router.push('/dashboard')
>>>>>>> Stashed changes
      }
    )
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Card bg="white" color="text.primary" borderColor="outline.dark" variant="outline">
            <CardHeader>
              <Heading size="md">Choose Your Career Path</Heading>
              <Text>Select a career path that interests you, or choose "Other" for more options.</Text>
            </CardHeader>
            <CardBody>
              <RadioGroup onChange={handleCareerPathSelect}>
                <VStack align="start" spacing={2}>
                  {staticCareerRoles.map((role) => (
                    <Radio key={role} value={role}>{role}</Radio>
                  ))}
                </VStack>
              </RadioGroup>
            </CardBody>
          </Card>
        )
      case 1:
        return (
          <Card bg="white" color="text.primary" borderColor="outline.dark" variant="outline">
            <CardHeader>
              <Heading size="md">Specify Your Career Path</Heading>
              <Text>Choose from our list or describe your desired career path.</Text>
            </CardHeader>
            <CardBody>
              {isLoadingCareerPaths ? (
                <Text>Loading career paths...</Text>
              ) : (
                <>
                  <RadioGroup onChange={setSelectedCareerPath} mb={4}>
                    <VStack align="start" spacing={2}>
                      {careerPaths?.map((path: any) => (
                        <Radio key={path.careerPath} value={path.careerPath}>{path.careerPath}</Radio>
                      ))}
                    </VStack>
                  </RadioGroup>
                  <Box>
                    <Text mb={2}>Or describe your desired career path:</Text>
                    <Textarea
                      value={selectedCareerPath || ''}
                      onChange={(e) => setSelectedCareerPath(e.target.value)}
                      placeholder="Describe your career path here..."
                    />
                  </Box>
                  <Button mt={4} onClick={handleCustomCareerPath}>Continue</Button>
                </>
              )}
            </CardBody>
          </Card>
        )
      case 2:
        const currentQuestion = personalityQuestions[personalityAnswers.length]
        return (
          <Card>
            <CardHeader>
              <Heading size="md">Personality & Interests</Heading>
              <Text>Answer these questions to help us suggest a career path for you.</Text>
            </CardHeader>
            <CardBody>
              <Heading size="sm" mb={4}>{currentQuestion.question}</Heading>
              <RadioGroup onChange={handlePersonalityAnswer}>
                <VStack align="start" spacing={2}>
                  {currentQuestion.options.map((option) => (
                    <Radio key={option} value={option}>{option}</Radio>
                  ))}
                </VStack>
              </RadioGroup>
            </CardBody>
          </Card>
        )
      case 3:
        return (
          <Card>
            <CardHeader>
              <Heading size="md">Suggested Occupations</Heading>
              <Text>Based on your selected career path in <strong>{selectedCareerPath}</strong>, here are some occupations you might be interested in:</Text>
            </CardHeader>
            <CardBody>
              {(isLoadingSuggestions || isLoadingSuggestionsByPersonality) ? (
                <Text>Loading suggested occupations...</Text>
              ) : (
                <RadioGroup onChange={handleOccupationAnswer}>
                  <VStack align="start" spacing={2}>
                    {(suggestedOccupations || suggestedOccupationsByPersonality)?.occupations?.map((occupation: { title: string }) => (
                      <Radio key={occupation.title} value={occupation.title}>{occupation.title}</Radio>
                    ))}
                  </VStack>
                </RadioGroup>
              )}
            </CardBody>
          </Card>
        )
    }
<<<<<<< Updated upstream
  }

  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" size="xl" mb={6}>Welcome to {process.env.NEXT_PUBLIC_APP_NAME}</Heading>
      <Box mb={8}>
        <Progress value={(step / 3) * 100} size="sm" colorScheme="blue" />
      </Box>
      <Flex align="center" mb={6}>
        {step === 0 && <BriefcaseConveyorBelt size={32} />}
        {step === 1 && <Briefcase size={32} />}
        {step === 2 && <Brain size={32} />}
        {step === 3 && <Lightbulb size={32} />}
        <Heading as="h2" size="lg" ml={4}>
          {step === 0 && "Choose Your Path"}
          {step === 1 && "Choose Other Path"}
          {step === 2 && "Discover Your Interests"}
          {step === 3 && "Explore Occupations"}
        </Heading>
      </Flex>
      {renderStep()}
      <Stack direction="row" justifyContent="space-between" mt={6}>
        {step > 0 && (
          <Button leftIcon={<ChevronLeft />} onClick={() => setStep(step - 1)} variant="outline">
            Back
          </Button>
        )}
        {step < 3 && step !== 1 && (
          <Button rightIcon={<ChevronRight />} onClick={() => setStep(step + 1)} variant="outline" ml="auto">
            {step === 0 ? "Skip" : "Next"}
          </Button>
        )}
        {step === 3 && (
          <Button
            rightIcon={<ChevronRight />}
            onClick={handleFinish}
            isLoading={isUpdating}
            loadingText="Finishing..."
            colorScheme="blue"
            ml="auto"
          >
            Finish
          </Button>
        )}
      </Stack>
    </Container>
=======

    return (
      <div className="flex flex-col gap-4 h-[40vh]">
        <div className="flex gap-4 overflow-y-hidden h-[40vh]">
          <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
            {occupations?.map((occupation: { title: string, description: string }) => (
              <motion.button
                key={occupation.title}
                onClick={() => setSelectedOccupation(occupation)}
                className={`${buttonStyles.base} ${selectedOccupation?.title === occupation.title ? buttonStyles.selected : buttonStyles.unselected
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {occupation.title}
              </motion.button>
            ))}
          </div>
          {selectedOccupation && <div className="flex flex-col gap-4 flex-1 bg-gray-100 p-4 rounded-lg overflow-y-auto">
            {/* More information about the occupation */}
            <h3 className="text-lg font-bold capitalize">{selectedOccupation?.title}</h3>
            <p className="text-sm text-gray-600">{selectedOccupation?.description}</p>
            <a href={`http://youtube.com/results?search_query=${selectedOccupation?.title.split(' ').join('+')}`} target="_blank" className="text-sm text-blue-500 flex items-center gap-2"><FaYoutube className="w-4 h-4" /> Youtube Learn more</a>
            <a href={`https://www.google.com/search?q=${selectedOccupation?.title.split(' ').join('+')}`} target="_blank" className="text-sm text-blue-500 flex items-center gap-2 "><FaGoogle className="w-4 h-4" /> Google Learn more</a>
            <a href={`https://www.linkedin.com/search/results/learning/?keywords=${selectedOccupation?.title.split(' ').join('+')}`} target="_blank" className="text-sm text-blue-500 flex items-center gap-2 "><FaLinkedin className="w-4 h-4" /> LinkedIn Learn more</a>
            <a href={`https://www.indeed.com/jobs?q=${selectedOccupation?.title.split(' ').join('+')}`} target="_blank" className="text-sm text-blue-500 flex items-center gap-2 "><SiIndeed className="w-4 h-4" /> Indeed Learn more</a>
            <a href={`https://www.glassdoor.com/search/?q=${selectedOccupation?.title.split(' ').join('+')}`} target="_blank" className="text-sm text-blue-500 flex items-center gap-2 "><SiGlassdoor className="w-4 h-4" /> Glassdoor Learn more</a>
            <a href={`https://www.reddit.com/search?q=${selectedOccupation?.title.split(' ').join('+')}`} target="_blank" className="text-sm text-blue-500 flex items-center gap-2 "><SiReddit className="w-4 h-4" /> Reddit Learn more</a>
            <a href={`https://www.quora.com/search?q=${selectedOccupation?.title.split(' ').join('+')}`} target="_blank" className="text-sm text-blue-500 flex items-center gap-2 "><SiQuora className="w-4 h-4" /> Quora Learn more</a>
            <a href={`https://www.wikipedia.org/wiki/${selectedOccupation?.title.split(' ').join('_')}`} target="_blank" className="text-sm text-blue-500 flex items-center gap-2 "><SiWikipedia className="w-4 h-4" /> Wikipedia Learn more</a>
          </div>}
        </div>
        <Button
          onClick={() => fetchSuggestedOccupations()}
          className="mt-4 bg-[#1CB0F6] hover:bg-[#1890d0] text-white"
        >
          {occupations?.length > 0 ? "Load other options" : "Load options"}
        </Button>
      </div>
    )
  }, [
    selectedCareerPath,
    suggestedOccupations,
    suggestedOccupationsByPersonality,
    isLoadingSuggestions,
    isLoadingSuggestionsByPersonality,
    selectedOccupation,
    fetchSuggestedOccupations
  ])

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] py-8">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeInUp}
        >
          <h1 className="text-3xl font-bold text-center mb-2">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </span>
          </h1>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 dark:bg-[#1A1A1A] h-2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Step Header */}
        <motion.div
          className="flex items-center justify-center mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="flex items-center gap-4">
            <StepIcon className="w-8 h-8 text-[#1CB0F6]" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {STEP_TITLES[step]}
            </h2>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="flex justify-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Render step content */}
          {step === STEPS.CHOOSE_PATH && (
            <Card className="w-full max-w-2xl bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-[#333333]">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Choose Your Career Path</h2>
                <p className="text-gray-600 dark:text-gray-400">Select a career path that interests you, or choose "Other" for more options.</p>
              </CardHeader>
              <CardContent>
                {renderCareerPathButtons()}
              </CardContent>
            </Card>
          )}
          {step === STEPS.OTHER_PATH && (
            <Card className="w-full max-w-2xl bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-[#333333]">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {careerPaths ? "Specify Your Career Path" : "Describe Your Career Path"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {careerPaths ? "Choose from our list or describe your desired career path." : "Kindly take some time to describe your desired career path."}
                </p>
              </CardHeader>
              <CardContent>
                {isLoadingCareerPaths ? (
                  <p>Loading career paths...</p>
                ) : (
                  <>
                    {careerPaths && (
                      <div className="mb-4">
                        <label htmlFor="careerPath" className="block text-sm font-medium text-gray-900 dark:text-white">
                          Choose a career path:
                        </label>
                        <select
                          id="careerPath"
                          name="careerPath"
                          value={selectedCareerPath || ''}
                          onChange={(e) => setSelectedCareerPath(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-[#1A1A1A] dark:text-white"
                        >
                          <option value="">Select a career path</option>
                          {careerPaths.map((path: any) => (
                            <option key={path.careerPath} value={path.careerPath}>
                              {path.careerPath}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div>
                      <label htmlFor="customCareerPath" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Kindly describe your desired career path:
                      </label>
                      <Textarea
                        id="customCareerPath"
                        name="customCareerPath"
                        value={(selectedCareerPath?.toLowerCase() === "other" ? '' : selectedCareerPath) ?? ''}
                        onChange={(e) => setSelectedCareerPath(e.target.value)}
                        placeholder="Describe your career path here... Your inclinations, Hobbies, or anything you think could help us recommend a path to you"
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-[#1A1A1A] dark:text-white"
                      />
                    </div>
                    <Button onClick={handleCustomCareerPath} className="mt-4 bg-[#1CB0F6] hover:bg-[#1890d0] text-white">Continue</Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}
          {step === STEPS.OCCUPATIONS && (
            <Card className="w-full max-w-2xl bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-[#333333]">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Suggested Occupations</h2>
                <p className="text-gray-600 dark:text-gray-400">Based on your selected career path in <strong className="text-gray-900 dark:text-white">{selectedCareerPath}</strong>, here are some occupations you might be interested in:</p>
              </CardHeader>
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 max-h-[40vh] overflow-y-auto">
                  {renderOccupationsList()}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 max-w-2xl mx-auto">
          {step > 0 && (
            <Button
              variant="outline"
              onClick={() => setStep(getPreviousStep(step, selectedCareerPath))}
              className="flex items-center gap-2 bg-gray-50 dark:bg-[#111111] hover:bg-[#1CB0F6]/10 dark:hover:bg-[#1CB0F6]/10 text-gray-900 dark:text-white"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
          )}
          {step < STEPS.OCCUPATIONS && step !== STEPS.OTHER_PATH && (
            <Button
              onClick={() => setStep((step + 1) as StepType)}
              className="flex items-center gap-2 ml-auto bg-[#1CB0F6] hover:bg-[#1890d0] text-white"
            >
              {step === STEPS.CHOOSE_PATH ? "Skip" : "Next"} <ChevronRight className="w-4 h-4" />
            </Button>
          )}
          {step === STEPS.OCCUPATIONS && (
            <Button
              onClick={handleFinish}
              disabled={isUpdating}
              className="flex items-center gap-2 ml-auto bg-[#1CB0F6] hover:bg-[#1890d0] text-white"
            >
              {isUpdating ? "Finishing..." : "Finish"} <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
>>>>>>> Stashed changes
  )
}
