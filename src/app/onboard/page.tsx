'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useCareerPath, useSuggestedOccupations, useSuggestedOccupationsByPersonality } from "@/services/useCareerPath"
import { useProfile } from "@/services/useProfile"
import { motion } from "framer-motion"
import { Briefcase, BriefcaseConveyorBelt, ChevronLeft, ChevronRight, Lightbulb } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useState } from 'react'
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

const personalityQuestions = [
  {
    question: "How do you prefer to work?",
    options: ["Independently", "In a team", "Mix of both"],
    benchmark: "Mix of both"
  },
  {
    question: "What type of problems do you enjoy solving?",
    options: ["Technical", "Creative", "Analytical", "People-oriented"],
    benchmark: "Analytical"
  },
  {
    question: "How do you handle stress?",
    options: ["Thrive under pressure", "Prefer a calm environment", "Adaptable to both"],
    benchmark: "Adaptable to both"
  },
  {
    question: "What's your ideal work environment?",
    options: ["Office", "Remote", "Outdoors", "Flexible"],
    benchmark: "Flexible"
  }
]

const staticCareerRoles = [
  "Technology Professional",
  "Healthcare Provider",
  "Business Manager",
  "Financial Expert",
  "Creative Professional",
  "Educator",
  "Engineer",
  "Legal Professional",
  "Marketing & Communications",
  "Sales Professional",
  "Research Scientist",
  "Social Service Provider",
  "Entrepreneur",
  "Trades Professional",
  "Other"
]

// At the top, add this type
type StepType = typeof STEPS[keyof typeof STEPS]

// Add this helper function near the top
const getPreviousStep = (currentStep: StepType, selectedPath: string | null): StepType => {
  if (currentStep === STEPS.OCCUPATIONS) {
    return selectedPath === "Other" ? STEPS.OTHER_PATH : STEPS.CHOOSE_PATH
  }
  return (currentStep - 1) as StepType
}

// Add missing type and calculation for progressPercentage
const calculateProgress = (step: StepType): number => {
  const totalSteps = Object.keys(STEPS).length
  return ((step + 1) / totalSteps) * 100
}

export default function OnboardingPage() {
  const [step, setStep] = useState<StepType>(STEPS.CHOOSE_PATH)
  const [selectedCareerPath, setSelectedCareerPath] = useState<string | null>(null)
  const [personalityAnswers, setPersonalityAnswers] = useState<string[]>([])
  const [selectedOccupation, setSelectedOccupation] = useState<{ title: string, description: string } | null>(null)

  const router = useRouter()
  const { updateProfile, isUpdating } = useProfile()
  const { data: careerPaths, isPending: isLoadingCareerPaths } = useCareerPath()
  const { data: suggestedOccupations, isPending: isLoadingSuggestions, mutate: fetchSuggestedOccupations } =
    useSuggestedOccupations(selectedCareerPath)
  const { data: suggestedOccupationsByPersonality, isPending: isLoadingSuggestionsByPersonality } =
    useSuggestedOccupationsByPersonality(personalityAnswers)

  // Add missing StepIcon component reference
  const StepIcon = STEP_ICONS[step]

  // Add progress calculation
  const progressPercentage = calculateProgress(step)

  const handleCareerPathSelect = useCallback((path: string) => {
    setSelectedCareerPath(path)
    setStep(path === "Other" ? STEPS.OTHER_PATH : STEPS.OCCUPATIONS)
  }, [setSelectedCareerPath, setStep])

  const handleCustomCareerPath = useCallback(() => {
    setStep(STEPS.OCCUPATIONS)
    if (selectedCareerPath?.toLowerCase() !== "other") {
      fetchSuggestedOccupations()
    }
  }, [selectedCareerPath, fetchSuggestedOccupations])

  const handleFinish = useCallback(() => {
    updateProfile(
      {
        careerPath: selectedCareerPath || selectedOccupation,
        projectedRole: selectedOccupation?.title,
        personalityAnswers,
        isOnboarded: true
      },
      {
        onSuccess: () => router.push('/dashboard')
      }
    )
  }, [selectedCareerPath, selectedOccupation, personalityAnswers, updateProfile, router]);

  // Add missing render functions
  const renderCareerPathButtons = () => {
    return (
      <div className="grid gap-4">
        {staticCareerRoles.map((role) => (
          <motion.button
            key={role}
            onClick={() => handleCareerPathSelect(role)}
            className={`${buttonStyles.base} ${selectedCareerPath === role ? buttonStyles.selected : buttonStyles.unselected
              }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {role}
          </motion.button>
        ))}
      </div>
    )
  }

  const renderOccupationsList = () => {
    if (isLoadingSuggestions || isLoadingSuggestionsByPersonality) {
      return <p>Loading suggested occupations...</p>
    }

    const occupations = suggestedOccupations?.occupations || suggestedOccupationsByPersonality?.occupations || []

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
  }

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
  )
}
