import apiClient from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export interface ResultLog {
  _id: string;
  qnaId: string;
  question: string;
  sessionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export type ResultLogs = ResultLog[];

export function useGetResultLogs() {
  return useMutation<ResultLogs, Error, string>({
    mutationFn: async (sessionId: string) => {
      const { data } = await apiClient.get<ResultLogs>(
        `/result-logs/session/${sessionId}`
      );
      return data;
    },
  });
}

export function useHandleRetakeTest() {
  return useMutation<ResultLogs, Error, string>({
    mutationFn: async (sessionId: string) => {
      const { data } = await apiClient.post<ResultLogs>(
        `/result-logs/retake-test`,
        { sessionId }
      );
      return data;
    },
  });
}
