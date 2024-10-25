import apiClient from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface QnAResponse {
  _id: string;
  questions: Question[];
  skillId: string;
}

export interface SubmitAnswerPayload {
  qnaId: string;
  skillId: string;
  questionId: string;
  selectedAnswer: number;
  sessionId: string;
}

export interface SubmitAnswerResponse {
  correct: boolean;
  progress: number;
}

export function useGetQuestions() {
  return useMutation<QnAResponse, Error, string>({
    mutationFn: async (skillId: string) => {
      const { data } = await apiClient.get<QnAResponse>(`/qna/${skillId}`);
      return data;
    },
  });
}

export function useSubmitAnswer() {
  const queryClient = useQueryClient();

  return useMutation<SubmitAnswerResponse, Error, SubmitAnswerPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<SubmitAnswerResponse>(
        `/qna/submit/${payload.qnaId}`,
        payload
      );
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["questions", variables.skillId],
      });
      queryClient.invalidateQueries({
        queryKey: ["skillsProgress"],
      });
    },
  });
}

export function useCompleteWorkshop() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, any>({
    mutationFn: async (payload) => {
      await apiClient.post(`/qna/complete/${payload.qnaId}`, payload);
    },
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: ["questions", payload.skillId],
      });
      queryClient.invalidateQueries({
        queryKey: ["skillsProgress"],
      });
    },
  });
}
