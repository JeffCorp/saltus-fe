"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useGetResultLogs } from '@/services/useResultLogs'
import { useUpdateSkillProgress } from '@/services/useSkillsProgress'
import { Spinner } from '@chakra-ui/react'
import { CheckCircle, XCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'

export default function TestSummary() {
  const { data: resultLogs, isPending: isLoadingResultLogs, mutate: getResultLogs } = useGetResultLogs()
  const { mutate: updateSkillProgress } = useUpdateSkillProgress()
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
      })
  }, [skillProgressId])

  if (isLoadingResultLogs) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#111111]">
        <Spinner color="#8A2EFF" size="xl" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#111111] py-8 px-4">
      <div className="container max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#8A2EFF] text-transparent bg-clip-text">
          Test Summary
        </h1>

        <Card className="bg-[#1A1A1A] border-[#333333]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              Your Score: {score.toFixed(1)}%
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-gray-300">
              <span>Correct Answers: {correctAnswers}</span>
              <span>Total Questions: {totalQuestions}</span>
            </div>
            <Progress
              value={score}
              className={`w-full h-3 ${score >= 70
                  ? '[&>div]:bg-[#58CC02]'
                  : score >= 50
                    ? '[&>div]:bg-[#FF9600]'
                    : '[&>div]:bg-[#FF4B4B]'
                } bg-[#222222]`}
            />
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Question Review</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resultLogs?.map((q, index) => (
            <Card key={q._id} className="bg-[#1A1A1A] border-[#333333]">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${q.isCorrect
                        ? 'bg-[#58CC02] hover:bg-[#58CC02]'
                        : 'bg-[#FF4B4B] hover:bg-[#FF4B4B]'
                      } text-white border-none`}
                  >
                    Question {index + 1}
                  </Badge>
                  {q.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-[#58CC02]" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#FF4B4B]" />
                  )}
                </div>
                <p className="text-white font-medium">{q.question}</p>
                <p className="text-gray-400">Your Answer: {q.userAnswer}</p>
                {!q.isCorrect && (
                  <p className="text-[#58CC02]">Correct Answer: {q.correctAnswer}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={handleRetakeTest}
            className="bg-[#8A2EFF] hover:bg-[#7325D4] text-white px-8 py-2"
          >
            Retake test
          </Button>
        </div>
      </div>
    </div>
  )
}