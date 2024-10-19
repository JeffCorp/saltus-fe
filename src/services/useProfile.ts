import apiClient from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getProfile = async () => {
  const { data } = await apiClient.get("users/me");
  return data;
};

const updateProfile = async (profileData: any) => {
  const { data } = await apiClient.put("/users/me", profileData);
  return data;
};

export function useProfile() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery<any, Error>({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const updateProfileMutation = useMutation<any, Error, Partial<any>>({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
  };
}
