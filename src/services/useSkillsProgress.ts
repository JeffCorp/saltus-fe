import apiClient from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface SkillProgress {
  id: string;
  skillModuleId:
    | string
    | { name: string; description: string; skillsTargeted: string[] };
  userId: string;
  progress: number;
  lastUpdated: Date;
  timeSpent: number;
  completed: boolean;
  proficiency: number;
}

export function useSkillsProgress() {
  return useQuery<SkillProgress[], Error>({
    queryKey: ["skillsProgress"],
    queryFn: async () => {
      const { data } = await apiClient.get<SkillProgress[]>("/skills-progress");
      return data;
    },
  });
}

export function useSkillsProgressByUserId() {
  return useMutation({
    mutationFn: async (userId: string) => {
      const { data } = await apiClient.get<SkillProgress[]>(
        `/skills-progress/user/${userId}`
      );
      return data;
    },
  });
}

export function useUpdateSkillProgress() {
  const queryClient = useQueryClient();

  return useMutation<SkillProgress, Error, Partial<SkillProgress>>({
    mutationFn: async (updatedProgress) => {
      const { data } = await apiClient.patch<SkillProgress>(
        `/skills-progress/${updatedProgress.id}`,
        updatedProgress
      );
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["skillsProgress", variables.userId],
      });
    },
  });
}

export function useAddSkillProgress() {
  const queryClient = useQueryClient();

  return useMutation<
    SkillProgress,
    Error,
    Omit<SkillProgress, "id" | "lastUpdated">
  >({
    mutationFn: async (newProgress) => {
      const { data } = await apiClient.post<SkillProgress>(
        "/skills-progress",
        newProgress
      );
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["skillsProgress", variables.userId],
      });
    },
  });
}
