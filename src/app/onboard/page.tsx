'use client'

import { useCareerPath, useSuggestedOccupations, useSuggestedOccupationsByPersonality } from "@/services/useCareerPath"
import { useProfile } from "@/services/useProfile"
import { Box, Button, Card, CardBody, CardHeader, Container, Flex, Heading, Progress, Radio, RadioGroup, Stack, Text, VStack } from "@chakra-ui/react"
import { Brain, Briefcase, ChevronLeft, ChevronRight, Lightbulb } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from 'react'

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

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedCareerPath, setSelectedCareerPath] = useState<string | null>(null)
  const [personalityAnswers, setPersonalityAnswers] = useState<string[]>([])
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(null)
  const { profile, isLoading, isError, error, updateProfile, isUpdating } = useProfile()
  const router = useRouter()

  const { data: careerPaths, isLoading: isLoadingCareerPaths } = useCareerPath()
  const { data: suggestedOccupations, isLoading: isLoadingSuggestions, refetch } = useSuggestedOccupations(selectedCareerPath)
  const { data: suggestedOccupationsByPersonality, isLoading: isLoadingSuggestionsByPersonality, refetch: refetchSuggestionsByPersonality } = useSuggestedOccupationsByPersonality(personalityAnswers)

  const handleCareerPathSelect = (path: string) => {
    setSelectedCareerPath(path)
    if (path === "Other") {
      setStep(2)
    } else {
      setStep(3)
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
        onSuccess: () => {
          router.push('/dashboard')
        },
        onError: (error) => {
          console.error('Onboarding failed:', error)
          // Handle error (e.g., show an error message to the user)
        },
      }
    )
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card bg="white" color="text.primary" borderColor="outline.dark" variant="outline">
            <CardHeader>
              <Heading size="md">Choose Your Career Path</Heading>
              <Text>Select a career path that interests you, or choose "Other" if you're unsure.</Text>
            </CardHeader>
            <CardBody>
              {isLoadingCareerPaths ? (
                <Text>Loading career paths...</Text>
              ) : (
                <RadioGroup onChange={handleCareerPathSelect}>
                  <VStack align="start" spacing={2}>
                    {careerPaths?.map((path: any) => (
                      <Radio key={path.careerPath} value={path.careerPath}>{path.careerPath}</Radio>
                    ))}
                    <Radio colorScheme="blue" value="Other">Other</Radio>
                  </VStack>
                </RadioGroup>
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
  }

  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" size="xl" mb={6}>Welcome to {process.env.NEXT_PUBLIC_APP_NAME}</Heading>
      <Box mb={8}>
        <Progress value={(step / 3) * 100} size="sm" colorScheme="blue" />
      </Box>
      <Flex align="center" mb={6}>
        {step === 1 && <Briefcase size={32} />}
        {step === 2 && <Brain size={32} />}
        {step === 3 && <Lightbulb size={32} />}
        <Heading as="h2" size="lg" ml={4}>
          {step === 1 && "Choose Your Path"}
          {step === 2 && "Discover Your Interests"}
          {step === 3 && "Explore Occupations"}
        </Heading>
      </Flex>
      {renderStep()}
      <Stack direction="row" justifyContent="space-between" mt={6}>
        {step > 1 && (
          <Button leftIcon={<ChevronLeft />} onClick={() => setStep(step - 1)} variant="outline">
            Back
          </Button>
        )}
        {step < 3 && step !== 2 && (
          <Button rightIcon={<ChevronRight />} onClick={() => setStep(step + 1)} variant="outline" ml="auto">
            Skip
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
  )
}