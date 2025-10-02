'use client'

import InterestSelection from '@/components/onboard/InterestSelection';
import QuestionsGuide from '@/components/onboard/QuestionsGuide';
import TechFieldsSuggestion from '@/components/onboard/TechFieldsSuggestion';
import WelcomeScreen from '@/components/onboard/WelcomeScreen';
import { useCareerPath } from '@/services/useCareerPath';
import { useProfile } from '@/services/useProfile';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Onboard() {
  const [step, setStep] = useState(1);
  const [userName] = useState('John'); // Replace with actual user name from your auth system
  const [suggestedPaths, setSuggestedPaths] = useState<string[]>([]);
  const router = useRouter();
  const { updateProfile, isUpdating } = useProfile()
  const { data: careerPaths, isPending: isLoadingCareerPaths } = useCareerPath()
  const [loadingMessage, setLoadingMessage] = useState('Updating your profile...')
  // const { data: suggestedOccupations, isPending: isLoadingSuggestions, mutate: fetchSuggestedOccupations } =
  //   useSuggestedOccupations(selectedCareerPath)
  // const { data: suggestedOccupationsByPersonality, isPending: isLoadingSuggestionsByPersonality } =
  //   useSuggestedOccupationsByPersonality(personalityAnswers)

  const handleInterestSelection = (interest: 'tech' | 'unsure') => {
    if (interest === 'tech') {
      setStep(4); // Skip to tech fields suggestion
    } else {
      setStep(3); // Go to guide questions
    }
  };

  const handleGuideComplete = (answers: string[]) => {
    const paths = analyzeTechPaths(answers);
    setSuggestedPaths(paths);
    setStep(4);
  };

  // Updated analysis function that returns multiple matching fields
  const analyzeTechPaths = (answers: string[]): string[] => {
    const [workStyle, approach, environment] = answers;
    const matches: string[] = [];

    // Match based on work style preference
    if (workStyle === 'independent') {
      matches.push('Backend Development', 'Data Engineering', 'Security Engineering');
    } else if (workStyle === 'collaborative') {
      matches.push('Frontend Development', 'UX Design', 'Product Management');
    } else if (workStyle === 'mixed') {
      matches.push('Full Stack Development', 'DevOps Engineering', 'Technical Leadership');
    }

    // Refine matches based on approach
    if (approach === 'creative') {
      matches.push('Frontend Development', 'UI/UX Design', 'Game Development');
    } else if (approach === 'structured') {
      matches.push('Data Engineering', 'Security Operations', 'Quality Assurance');
    }

    // Further refine based on environment preference
    if (environment === 'collaborative') {
      matches.push('Scrum Master', 'Product Management', 'Technical Project Management');
    } else if (environment === 'independent') {
      matches.push('Systems Architecture', 'Database Administration', 'Technical Writing');
    }

    // Remove duplicates and return unique matches
    return Array.from(new Set(matches));
  };

  const handleFieldSelection = (field: string) => {
    // Handle the selected field (e.g., save to user profile, redirect to learning path)
    console.log('Selected field:', field);
  };

  const handleFinish = useCallback((careerPath: string) => {
    console.log("careerPath => ", careerPath);
    updateProfile(
      {
        careerPath: careerPath,
        projectedRole: careerPath,
        personalityAnswers: [],
        isOnboarded: true
      },
      {
        onSuccess: () => router.push('/dashboard')
      }
    )
  }, [careerPaths, updateProfile, router]);

  useEffect(() => {
    const messages = [
      "Updating your profile...",
      "Please wait while we process your information...",
      "This may take a few seconds...",
      "Almost there...",
      "We're almost done...",
      "Just a few more seconds...",
    ]
    const interval = setInterval(() => {
      const message = messages[Math.floor(Math.random() * messages.length)]
      setLoadingMessage(message)
    }, 4000)
    return () => clearInterval(interval)
  }, [])


  return (
    <div className="min-h-screen bg-[#111111] py-8 px-4">
      <div className="container mx-auto mt-10">
        {step === 1 && (
          <WelcomeScreen
            userName={userName}
            onNext={() => setStep(2)}
            currentStep={step}
            totalSteps={4}
          />
        )}
        {step === 2 && (
          <InterestSelection
            onSelect={handleInterestSelection}
          />
        )}
        {step === 3 && (
          <QuestionsGuide
            onComplete={handleGuideComplete}
          />
        )}
        {step === 4 && (
          <TechFieldsSuggestion
            onSelect={handleFieldSelection}
            suggestedPaths={suggestedPaths}
            onClearSuggestions={() => setSuggestedPaths([])}
            onFinish={handleFinish}
          />
        )}
      </div>

      {/* Modal Spinner with Blurred Background */}
      {isUpdating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred Background */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Spinner Modal */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-4 rounded-lg bg-white/10 p-8 backdrop-blur-md">
            {/* Spinner */}
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>

            {/* Loading Text */}
            <p className="text-white text-lg font-medium">{loadingMessage}</p>

            {/* Optional: Progress indicator */}
            <div className="h-1 w-32 rounded-full bg-white/20">
              <div className="h-1 w-full animate-pulse rounded-full bg-white/60"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
