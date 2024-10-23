'use client'

import { useProfile } from '@/services/useProfile';
import { useCompleteWorkshop, useGetQuestions, useSubmitAnswer } from '@/services/useQnA';
import { SkillProgress, useSkillsProgressByUserId } from '@/services/useSkillsProgress';
import { Box, Button, Container, Flex, Heading, Progress, Spinner, Text, useToast, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Workshop = () => {
  const router = useRouter();
  const toast = useToast();
  const { profile } = useProfile();
  const { data: skillsProgress, mutate: refreshSkillsProgress } = useSkillsProgressByUserId();

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
      const skill = skillsProgress.find(s => s.skillModuleId._id === skillId);

      console.log(skill);

      if (skill) {
        setCurrentSkill(skill);
      }
    }
  }, [skillsProgress]);

  useEffect(() => {
    if (currentSkill) {
      fetchQuestions(currentSkill?.skillModuleId._id);
    }
  }, [currentSkill]);

  const handleAnswer = (selectedIndex: number) => {
    if (!currentSkill || !qnaData || answerSubmitted) return;

    setAnswerSubmitted(true);

    submitAnswer(
      {
        qnaId: qnaData._id,
        skillId: currentSkill.id,
        questionId: String(currentQuestionIndex + 1),
        selectedAnswer: selectedIndex,
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
    return <Flex justify="center" align="center" height="100vh"><Spinner /></Flex>;
  }

  return (
    <Container maxW="container.lg" py={8} height="100vh">
      <VStack spacing={6} align="stretch">
        <Heading>{typeof currentSkill.skillModuleId === 'string' ? currentSkill.skillModuleId : currentSkill.skillModuleId.name} Workshop</Heading>
        {!isTestComplete ? (
          <>
            <Box>
              <Text fontWeight="bold">Question {currentQuestionIndex + 1} of {qnaData.questions.length}</Text>
              <Text mt={2}>{qnaData.questions[currentQuestionIndex].text}</Text>
            </Box>
            <Progress value={(currentQuestionIndex / qnaData.questions.length) * 100} size="sm" colorScheme="blue" />
            <Flex flexDirection="column" gap={3}>
              {qnaData.questions[currentQuestionIndex].options.map((option, index) => (
                <Button
                  variant="ghost"
                  bg="whiteAlpha.100"
                  textAlign="start"
                  color="black"
                  key={index}
                  onClick={() => handleAnswer(index)}
                  width="full"
                  isDisabled={answerSubmitted}
                  _focus={{ boxShadow: 'none' }}
                >
                  {option}
                </Button>
              ))}
            </Flex>
          </>
        ) : (
          <VStack spacing={4}>
            <Heading size="md">Workshop Complete!</Heading>
            <Text>Your score: {score}/{qnaData.questions.length}</Text>
            <Button onClick={() => router.push('/dashboard/skills')}>Back to Skills</Button>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Workshop;
