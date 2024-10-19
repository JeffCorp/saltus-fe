import apiClient from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export function useCareerPath() {
  return useQuery({
    queryKey: ["careerPaths"],
    queryFn: async () => {
      const { data } = await apiClient.get("/career-paths");
      return data.data;
    },
  });
}

export function useSuggestedOccupations(careerPath: string | null) {
  return useQuery({
    queryKey: ["suggestedOccupations", careerPath],
    queryFn: async () => {
      if (!careerPath) return null;
      const { data } = await apiClient.get(
        `/career-paths/suggested-occupations?careerPath=${careerPath}`
      );
      return data.data;
    },
    enabled: !!careerPath,
  });
}

export function useSuggestedOccupationsByPersonality(
  personalityAnswers: string[]
) {
  return useQuery({
    queryKey: ["suggestedOccupationsByPersonality", personalityAnswers],
    queryFn: async () => {
      if (personalityAnswers.length === 0) return null;
      const { data } = await apiClient.get(
        `/career-paths/suggested-occupations?personalityAnswers=${personalityAnswers}`
      );
      return data.data;
    },
    enabled: !!personalityAnswers,
  });
}
