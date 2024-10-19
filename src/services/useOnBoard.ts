import apiClient from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useOnBoard() {
  return useMutation({
    mutationFn: async (data: {
      id: string;
      careerPath: string;
      personalityAnswers: string[];
    }) => {
      const response = await apiClient.post("/onboard", data);
      return response.data;
    },
  });
}
