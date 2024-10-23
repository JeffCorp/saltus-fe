import apiClient from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
}

export function useSkills() {
  return useMutation<Skill[], Error, string>({
    mutationFn: async (userId: string) => {
      const { data } = await apiClient.get<Skill[]>(`/skills/user/${userId}`);
      return data;
    },
  });
}

export function useSkillsByUserId(userId: string) {
  return useQuery<Skill[], Error>({
    queryKey: ["skills", userId],
    queryFn: async () => {
      const { data } = await apiClient.get<Skill[]>(`/skills/user/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
}

export function useAddSkill() {
  const queryClient = useQueryClient();

  return useMutation<Skill, Error, Omit<Skill, "id">>({
    mutationFn: async (newSkill) => {
      const { data } = await apiClient.post<Skill>("/skills", newSkill);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
}

export function useUpdateSkill() {
  const queryClient = useQueryClient();

  return useMutation<Skill, Error, Skill>({
    mutationFn: async (updatedSkill) => {
      const { data } = await apiClient.put<Skill>(
        `/skills/${updatedSkill.id}`,
        updatedSkill
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
}

export function useDeleteSkill() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (skillId) => {
      await apiClient.delete(`/skills/${skillId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
}
