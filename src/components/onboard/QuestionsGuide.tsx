'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useTextRecognition } from "@/services/useTextRecognition";
import { useTTS } from "@/services/useTTS";
import Image from "next/image";
import { useState } from "react";

interface Question {
  id: number;
  text: string;
  voiceText?: string;
  options: {
    text: string;
    value: string;
    description?: string;
  }[];
  image?: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Do you prefer working independently or in team settings?",
    voiceText: "Tell me about your preferred work style. Do you prefer working independently on focused tasks or collaborating in team settings?",
    options: [
      {
        text: "Independent Work",
        value: "independent",
        description: "I prefer focusing on tasks individually"
      },
      {
        text: "Team Collaboration",
        value: "collaborative",
        description: "I enjoy working with others and sharing ideas"
      },
      {
        text: "Mixed Approach",
        value: "mixed",
        description: "I'm comfortable with both styles"
      }
    ],
    image: "/assets/images/team.svg"
  },
  {
    id: 2,
    text: "How do you approach your work?",
    voiceText: "Are you more energized by creative, open-ended work or by following established processes?",
    options: [
      {
        text: "Creative & Open-ended",
        value: "creative",
        description: "I enjoy exploring new ideas and solutions"
      },
      {
        text: "Structured & Process-driven",
        value: "structured",
        description: "I prefer following established methods"
      }
    ],
    image: "/assets/images/creative.svg"
  },
  {
    id: 3,
    text: "What's your ideal work environment?",
    voiceText: "Finally, let's talk about your ideal work environment.",
    options: [
      {
        text: "Collaborative team settings",
        value: "collaborative",
        description: "You thrive in team environments with lots of interaction"
      },
      {
        text: "Independent focused work",
        value: "independent",
        description: "You prefer working independently on focused tasks"
      },
      {
        text: "Mixed environment",
        value: "mixed",
        description: "You enjoy both team collaboration and independent work"
      }
    ],
    image: "/assets/images/workspace.svg"
  }
];

interface QuestionsGuideProps {
  onComplete: (answers: string[]) => void;
}

export default function QuestionsGuide({ onComplete }: QuestionsGuideProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const { speak, cancel } = useTTS();
  const [isRecording, setIsRecording] = useState(false);
  const { startRecording, stopRecording } = useTextRecognition({
    onTranscriptChange: (transcript) => {
      console.log("Voice response:", transcript);
    }
  });

  // useEffect(() => {
  //   const question = questions[currentQuestion];
  //   speak(question.voiceText || question.text);
  //   return () => cancel();
  // }, [currentQuestion, speak, cancel]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    if (currentQuestion < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQuestion(curr => curr + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const question = questions[currentQuestion];

  return (
    <Card className="bg-[#1A0B33] border-[#333333] max-w-6xl mx-auto">
      <CardContent className="py-8">
        <CardTitle className="text-3xl font-bold text-white text-center mb-12">
          {question.text}
        </CardTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Illustration */}
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-lg flex items-center justify-center">
              <Image
                src={question.image || "/assets/images/question.svg"}
                alt="Question Illustration"
                width={256}
                height={256}
              />
            </div>
          </div>

          {/* Right Side - Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleAnswer(option.value)}
                // onMouseEnter={() => speak(option.text)}
                // onMouseLeave={() => cancel()}
                className="w-full !h-auto !border-[#8A2EFF] hover:!border-[#7325D4] text-white p-6 group"
              >
                <div>
                  <div className="font-semibold">{option.text}</div>
                  {option.description && (
                    <div className="text-sm text-gray-400 group-hover:text-gray-300">
                      {option.description}
                    </div>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentQuestion ? 'bg-[#8A2EFF]' : 'bg-[#333333]'
                }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              if (isRecording) {
                stopRecording();
              } else {
                startRecording();
              }
              setIsRecording(!isRecording);
            }}
            className={`${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-[#333333] hover:bg-[#444444]'
              } text-white`}
          >
            {isRecording ? 'Stop Recording' : 'Record Response'}
          </Button>
          {isRecording && (
            <span className="text-sm text-gray-400">
              Recording... Speak your answer clearly
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 