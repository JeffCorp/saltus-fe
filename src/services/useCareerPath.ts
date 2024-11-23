import apiClient from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useCareerPath() {
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.get("/career-paths");
      return data.data;
    },
  });
}

export function useSuggestedOccupations(careerPath: string | null) {
  return useMutation({
    mutationFn: async () => {
      if (!careerPath) return null;
      const { data } = await apiClient.get(
        `/career-paths/suggested-occupations?careerPath=${careerPath}`
      );
      return data.data;
    },
  });
}

export function useSuggestedOccupationsByPersonality(
  personalityAnswers: string[]
) {
  return useMutation({
    mutationFn: async () => {
      if (personalityAnswers.length === 0) return null;
      const { data } = await apiClient.get(
        `/career-paths/suggested-occupations?personalityAnswers=${personalityAnswers}`
      );
      return data.data;
    },
  });
}
