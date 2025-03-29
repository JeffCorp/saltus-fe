import apiClient from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const mockInterview = async (jobDescription: string) => {
  const response = await apiClient.post("/interviews/qa", { jobDescription });
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
