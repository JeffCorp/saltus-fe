import apiClient from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
    mutationFn: async (userData: {
      name: string;
      email: string;
      password: string;
    }) => {
      const { data } = await apiClient.post(`/auth/signup`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      return data;
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async (userData: { email: string; password: string }) => {
      const { data } = await apiClient.post(`/auth/login`, {
        email: userData.email,
        password: userData.password,
      });
      return data;
    },
  });
}
