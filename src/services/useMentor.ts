import apiClient from "@/lib/api-client";
import { useToast } from "@chakra-ui/react";
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

export function useGetMentors() {
  return useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      const { data } = await apiClient.get(`/mentorship/mentors`);
      return data;
    },
  });
}

export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await apiClient.get(`/mentorship/users`);
      return data;
    },
  });
}

export function useGetMentorsByMenteeId(menteeId?: string) {
  return useQuery({
    queryKey: ["mentees", menteeId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/mentorship/mentee/${menteeId}`);
      return data;
    },
    enabled: !!menteeId,
  });
}

export function useGetMentees() {
  return useQuery({
    queryKey: ["mentees"],
    queryFn: async () => {
      const { data } = await apiClient.get(`/mentorship/mentees`);
      return data;
    },
  });
}

export function useCreateMentorRelationship({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) {
  return useMutation({
    mutationFn: async (mentorData: Omit<Mentor, "id">) => {
      const { data } = await apiClient.post("/mentorship", mentorData);
      return data;
    },
    onSuccess,
    onError,
  });
}

export function useUpdateMentorshipStatus() {
  const toast = useToast();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data } = await apiClient.patch(`/mentorship/${id}/status`, {
        status,
      });

      if (data)
        toast({
          title: "The request has been " + status,
          description: "The request been " + status,
          status: "info",
          duration: 50000,
          isClosable: true,
          position: "top-right",
        });
      return data;
    },
  });
}
