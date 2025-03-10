import apiClient from "@/lib/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";

interface Mentor {
  id: string;
  mentorId: string;
  menteeId: string;
  status: "pending" | "active" | "completed" | "rejected";
  startDate?: Date;
  endDate?: Date;
  focusAreas?: string[];
}

export function useGetMentorsByMentorId(mentorId?: string) {
  return useQuery({
    queryKey: ["mentors", mentorId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/mentors/mentor/${mentorId}`);
      return data;
    },
    enabled: !!mentorId,
  });
}

export function useGetMentorsByMenteeId(menteeId?: string) {
  return useQuery({
    queryKey: ["mentees", menteeId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/mentors/mentee/${menteeId}`);
      return data;
    },
    enabled: !!menteeId,
  });
}

export function useCreateMentorRelationship() {
  return useMutation({
    mutationFn: async (mentorData: Omit<Mentor, "id">) => {
      const { data } = await apiClient.post("/mentors", mentorData);
      return data;
    },
  });
}

export function useUpdateMentorStatus() {
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data } = await apiClient.patch(`/mentors/${id}/status`, {
        status,
      });
      return data;
    },
  });
}
