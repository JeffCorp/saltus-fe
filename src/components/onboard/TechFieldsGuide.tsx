'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "What interests you more?",
    options: [
      "Creating visual experiences and interfaces",
      "Solving complex problems and working with data",
      "Building systems and infrastructure"
    ]
  },
  {
    id: 2,
    text: "How do you prefer to work?",
    options: [
      "Collaboratively with designers and users",
      "Independently on technical challenges",
      "Both, depending on the project"
    ]
  }
];

interface TechFieldsGuideProps {
  onComplete: (answers: string[]) => void;
}

export default function TechFieldsGuide({ onComplete }: TechFieldsGuideProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    if (currentQuestion < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQuestion(curr => curr + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <Card className="bg-[#1A1A1A] border-[#333333] max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white text-center">
          {questions[currentQuestion].text}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions[currentQuestion].options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(option)}
            className="w-full bg-[#222222] hover:bg-[#333333] text-white p-6 text-left"
          >
            {option}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
} 