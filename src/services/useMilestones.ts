import apiClient from "@/lib/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";

interface Milestone {
  id: string;
  title: string;
  description: string;
  skills: string[];
  skillGrade: number;
  userId: string;
  careerName: string;
  isCompleted: boolean;
  completedAt?: Date;
  status: "pending" | "in_progress" | "completed";
}

export function useGetMilestonesByUserId(userId?: string) {
  return useQuery({
    queryKey: ["milestones", userId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/milestones/user/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
}

export function useGetMilestonesByCareer(userId?: string, careerName?: string) {
  return useQuery({
    queryKey: ["milestones", userId, careerName],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/milestones/user/${userId}/career?careerName=${careerName}`
      );
      console.log(data);
      return data;
    },
    enabled: !!userId && !!careerName,
  });
}

export function useCreateMilestone() {
  return useMutation({
    mutationFn: async (milestone: Omit<Milestone, "id">) => {
      const { data } = await apiClient.post("/milestones", milestone);
      return data;
    },
  });
}

export function useUpdateMilestoneStatus() {
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "pending" | "in_progress" | "completed";
    }) => {
      const { data } = await apiClient.patch(`/milestones/${id}/status`, {
        status,
      });
      return data;
    },
  });
}
