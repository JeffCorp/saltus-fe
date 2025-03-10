import apiClient from "@/lib/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  description?: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialUrl?: string;
  userId: string;
  verificationId?: string;
}

export function useGetCertificatesByUserId(userId?: string) {
  return useQuery({
    queryKey: ["certificates", userId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/certificates/user/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
}

export function useCreateCertificate() {
  return useMutation({
    mutationFn: async (certificate: Omit<Certificate, "id">) => {
      const { data } = await apiClient.post("/certificates", certificate);
      return data;
    },
  });
}
