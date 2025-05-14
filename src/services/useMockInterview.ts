import apiClient from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const mockInterview = async (jobDescription: string) => {
  const response = await apiClient.post("/interviews/qa", { jobDescription });
  return response.data;
};

const mockInterviewTechnical = async (jobDescription: string) => {
  const response = await apiClient.post("/interviews/qa/technical", {
    jobDescription,
  });
  return response.data;
};

const mockInterviewFeedback = async (results: any) => {
  const response = await apiClient.post("/interviews/qa/feedback", {
    results,
  });
  return response.data;
};

export const useMockInterview = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: mockInterview,
    onSuccess,
    onError,
  });
};

export const useMockInterviewTechnical = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: mockInterviewTechnical,
    onSuccess,
    onError,
  });
};

export const useMockInterviewFeedback = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: mockInterviewFeedback,
    onSuccess,
    onError,
  });
};
