"use client"

import {
  Badge,
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  Progress,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { CheckCircle, XCircle } from 'lucide-react'

// Mock data for test results
const testResults = {
  totalQuestions: 10,
  correctAnswers: 7,
  questions: [
    { id: 1, question: "What is the capital of France?", userAnswer: "Paris", correctAnswer: "Paris", isCorrect: true },
    { id: 2, question: "Who painted the Mona Lisa?", userAnswer: "Van Gogh", correctAnswer: "Leonardo da Vinci", isCorrect: false },
    { id: 3, question: "What is the largest planet in our solar system?", userAnswer: "Jupiter", correctAnswer: "Jupiter", isCorrect: true },
    { id: 4, question: "In which year did World War II end?", userAnswer: "1945", correctAnswer: "1945", isCorrect: true },
    { id: 5, question: "What is the chemical symbol for gold?", userAnswer: "Au", correctAnswer: "Au", isCorrect: true },
    { id: 6, question: "Who wrote 'Romeo and Juliet'?", userAnswer: "Charles Dickens", correctAnswer: "William Shakespeare", isCorrect: false },
    { id: 7, question: "What is the largest ocean on Earth?", userAnswer: "Pacific Ocean", correctAnswer: "Pacific Ocean", isCorrect: true },
    { id: 8, question: "How many continents are there?", userAnswer: "7", correctAnswer: "7", isCorrect: true },
    { id: 9, question: "What is the capital of Japan?", userAnswer: "Seoul", correctAnswer: "Tokyo", isCorrect: false },
    { id: 10, question: "Who invented the telephone?", userAnswer: "Alexander Graham Bell", correctAnswer: "Alexander Graham Bell", isCorrect: true },
  ],
}

export default function TestSummary() {
  const bgColor = useColorModeValue('gray.50', 'gray.800')
  const cardBgColor = useColorModeValue('white', 'gray.700')

  const score = (testResults.correctAnswers / testResults.totalQuestions) * 100

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
                <Text>Correct Answers: {testResults.correctAnswers}</Text>
                <Text>Total Questions: {testResults.totalQuestions}</Text>
              </HStack>
              <Progress value={score} colorScheme={score >= 70 ? 'green' : score >= 50 ? 'yellow' : 'red'} size="lg" borderRadius="full" />
            </VStack>
          </Box>

          <Divider />

          <Heading as="h2" size="xl">
            Question Review
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {testResults.questions.map((q) => (
              <Box key={q.id} bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
                <VStack align="stretch" spacing={3}>
                  <HStack>
                    <Badge colorScheme={q.isCorrect ? 'green' : 'red'} fontSize="sm">
                      Question {q.id}
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
      </Container>
    </Box>
  )
}