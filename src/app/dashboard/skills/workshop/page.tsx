'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProfile } from '@/services/useProfile';
import { useCompleteWorkshop, useGetQuestions, useSubmitAnswer } from '@/services/useQnA';
import { SkillProgress, useSkillsProgressByUserId } from '@/services/useSkillsProgress';
import { removeEscapeCharacters } from '@/utils';
import { Spinner, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Workshop = () => {
  const router = useRouter();
  const toast = useToast();
  const { profile } = useProfile();
  const { data: skillsProgress, mutate: refreshSkillsProgress } = useSkillsProgressByUserId();
  const session = useMemo(() => uuidv4(), []);

  const [currentSkill, setCurrentSkill] = useState<SkillProgress | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const { data: qnaData, isPending: isLoadingQuestions, mutate: fetchQuestions } = useGetQuestions();
  const { mutate: submitAnswer } = useSubmitAnswer();
  const { mutate: completeWorkshop } = useCompleteWorkshop();

  useEffect(() => {
    if (profile) {
      refreshSkillsProgress(profile._id);
    }
  }, [profile?._id]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const skillId = searchParams.get('skillId');

    if (skillsProgress && skillId) {
      const skill = skillsProgress.find(s => typeof s.skillModuleId === 'string' ? s.skillModuleId === skillId : s.skillModuleId._id === skillId);

      if (skill) {
        setCurrentSkill(skill);
      }
    }
  }, [skillsProgress]);

  useEffect(() => {
    if (currentSkill) {
      fetchQuestions(typeof currentSkill.skillModuleId === 'string' ? currentSkill.skillModuleId : currentSkill.skillModuleId._id);
    }
  }, [currentSkill]);

  if (qnaData) {
    scrollTo(0, 0)
  }

  const handleAnswer = (selectedIndex: number) => {
    if (!currentSkill || !qnaData || answerSubmitted) return;

    setAnswerSubmitted(true);

    submitAnswer(
      {
        qnaId: qnaData._id,
        skillId: currentSkill._id,
        questionId: String(currentQuestionIndex + 1),
        selectedAnswer: selectedIndex,
        sessionId: session,
      },
      {
        onSuccess: (data) => {
          if (data.correct) {
            setScore(score + 1);
          }

          if (currentQuestionIndex + 1 < qnaData.questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setAnswerSubmitted(false);
          } else {
            completeTest();
          }
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to submit answer",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
      }
    );
  };

  const completeTest = () => {
    setIsTestComplete(true);
    if (currentSkill) {
      completeWorkshop({
        qnaId: qnaData?._id,
        skillsProgressId: currentSkill._id,
        score: score * 100 / (qnaData?.questions?.length || 0),
      }, {
        onSuccess: () => {
          toast({
            title: "Workshop completed",
            description: `Your progress has been updated. Score: ${score}/${qnaData?.questions.length}`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });

          router.push(`/dashboard/skills/results?sessionId=${session}&skillProgressId=${currentSkill._id}`);
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to complete workshop",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
      });
    }
  };

  if (isLoadingQuestions || !currentSkill || !qnaData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#111111]">
        <Spinner color="#8A2EFF" size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        <Card className="bg-[#1A1A1A] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              {typeof currentSkill.skillModuleId === 'string'
                ? currentSkill.skillModuleId
                : currentSkill.skillModuleId.name} Workshop
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isTestComplete ? (
              <div className="space-y-6">
                <div>
                  <Text className="text-gray-300 font-medium mb-4">
                    Question {currentQuestionIndex + 1} of {qnaData.questions.length}
                  </Text>
                  <Text className="text-white text-lg">
                    {removeEscapeCharacters(qnaData.questions[currentQuestionIndex]?.text || '')}
                  </Text>
                </div>

                <Progress
                  value={(currentQuestionIndex / qnaData.questions.length) * 100}
                  className="w-full bg-[#222222] [&>div]:bg-gradient-to-r [&>div]:from-[#58CC02] [&>div]:to-[#1CB0F6]"
                />

                <div className="space-y-3">
                  {qnaData.questions[currentQuestionIndex]?.options?.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={answerSubmitted}
                      className={`w-full justify-start p-4 h-auto text-left whitespace-normal
                        ${answerSubmitted
                          ? 'bg-[#222222] text-gray-400'
                          : 'bg-[#222222] hover:bg-[#2A2A2A] text-white'
                        } border border-[#444444]`}
                    >
                      {removeEscapeCharacters(option)}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <Text className="text-2xl font-bold text-white">Workshop Complete!</Text>
                <Text className="text-xl text-[#58CC02]">
                  Your score: {score}/{qnaData.questions.length}
                </Text>
                <Button
                  onClick={() => router.push('/dashboard/skills')}
                  className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white"
                >
                  Back to Skills
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Workshop;
