"use client"

import { useGetResultLogs } from '@/services/useResultLogs'
import { useUpdateSkillProgress } from '@/services/useSkillsProgress'
import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Progress,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { CheckCircle, XCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'

export default function TestSummary() {
  const bgColor = useColorModeValue('gray.50', 'gray.800')
  const cardBgColor = useColorModeValue('white', 'gray.700')
  const { data: resultLogs, isPending: isLoadingResultLogs, mutate: getResultLogs } = useGetResultLogs()
  const { data: skillProgress, status: statusUpdateSkillProgress, isPending: isLoadingSkillProgress, mutate: updateSkillProgress } = useUpdateSkillProgress()
  const params = useSearchParams()
  const sessionId = params.get('sessionId')
  const skillProgressId = params.get('skillProgressId');
  const router = useRouter()

  useEffect(() => {
    getResultLogs(sessionId || '')
  }, [sessionId])

  const score = useMemo(() => {
    return (resultLogs?.filter((q) => q.isCorrect).length || 0) / (resultLogs?.length || 0) * 100
  }, [resultLogs])

  const correctAnswers = useMemo(() => {
    return resultLogs?.filter((q) => q.isCorrect).length || 0
  }, [resultLogs])

  const totalQuestions = useMemo(() => {
    return resultLogs?.length || 0
  }, [resultLogs])

  const handleRetakeTest = useCallback(() => {
    updateSkillProgress({
      _id: skillProgressId || '',
      completed: false,
      isRetaking: true,
    },
      {
        onSuccess: (data) => {
          const skillId = typeof data?.skillModuleId === 'string'
            ? data.skillModuleId
            : data?.skillModuleId?._id;
          router.push(`/dashboard/skills/workshop?skillId=${skillId}`);
        }
      }
    )
  }, [])

  if (isLoadingResultLogs) {
    return <Spinner />
  }

  return (
    <Box bg={bgColor} minHeight="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center">
            Test Summary
          </Heading>

          <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
            <VStack spacing={4} align="stretch">
              <Heading as="h2" size="lg">
                Your Score: {score.toFixed(1)}%
              </Heading>
              <HStack justify="space-between">
                <Text>Correct Answers: {correctAnswers}</Text>
                <Text>Total Questions: {totalQuestions}</Text>
              </HStack>
              <Progress value={score} colorScheme={score >= 70 ? 'green' : score >= 50 ? 'yellow' : 'red'} size="lg" borderRadius="full" />
            </VStack>
          </Box>

          <Divider />

          <Heading as="h2" size="xl">
            Question Review
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {resultLogs?.map((q, index) => (
              <Box key={q._id} bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
                <VStack align="stretch" spacing={3}>
                  <HStack>
                    <Badge colorScheme={q.isCorrect ? 'green' : 'red'} fontSize="sm">
                      Question {index + 1}
                    </Badge>
                    {q.isCorrect ? (
                      <CheckCircle size={20} color="green" />
                    ) : (
                      <XCircle size={20} color="red" />
                    )}
                  </HStack>
                  <Text fontWeight="bold">{q.question}</Text>
                  <Text>Your Answer: {q.userAnswer}</Text>
                  {!q.isCorrect && (
                    <Text color="green.500">Correct Answer: {q.correctAnswer}</Text>
                  )}
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
        <Flex justify="center" mt={8}>
          <Button onClick={handleRetakeTest}>Retake test</Button>
        </Flex>
      </Container>
    </Box>
  )
}