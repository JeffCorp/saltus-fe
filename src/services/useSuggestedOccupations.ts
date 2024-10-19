import apiClient from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export function useSuggestedOccupations(careerPath: string | null) {
  return useQuery({
    queryKey: ["suggestedOccupations", careerPath],
    queryFn: async () => {
      if (!careerPath) return [];
      const { data } = await apiClient.get(
        `/suggested-occupations?careerPath=${careerPath}`
      );
      return data.data;
    },
    enabled: !!careerPath,
  });
}
