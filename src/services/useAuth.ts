import apiClient from "@/lib/api-client";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  const toast = useToast();

  return useMutation({
    mutationFn: async (userData: {
      name: string;
      email: string;
      password: string;
    }) => {
      try {
        const { data } = await apiClient.post(`/auth/signup`, {
          name: userData.name,
          email: userData.email,
          password: userData.password,
        });
        return data;
      } catch (error: any) {
        console.log(error);

        toast({
          title: "Error",
          description: error?.response?.data?.message ?? error?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
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
