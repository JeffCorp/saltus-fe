import apiClient from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getProfile = async () => {
  const { data } = await apiClient.get("users/me");
  return data;
};

const getAllProfiles = async () => {
  const { data } = await apiClient.get("users"); // TODO: Remove this ensure users only search for not fetch all profiles
  return data;
};

const getConnections = async () => {
  const { data } = await apiClient.get("users/connections");
  return data;
};

const getProfileById = async (id: string) => {
  const { data } = await apiClient.get(`users/${id}`);
  return data;
};

const updateProfile = async (profileData: any) => {
  const { data } = await apiClient.put("/users/me", profileData);
  return data;
};

const updateProfileData = async (profileData: any) => {
  const { data } = await apiClient.put("/users/me/profile", profileData);
  return data;
};

export function useProfile(id?: string) {
  const queryClient = useQueryClient();

  const profileQuery = useQuery<any, Error>({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const useGetAllProfiles = useQuery<any, Error>({
    queryKey: ["profiles"],
    queryFn: getAllProfiles,
  });

  const getConnectionsQuery = useQuery<any, Error>({
    queryKey: ["connections"],
    queryFn: getConnections,
  });

  const getProfileByIdQuery = useQuery<any, Error>({
    queryKey: ["profile", id],
    queryFn: () => getProfileById(id as string),
  });

  const updateProfileMutation = useMutation<any, Error, Partial<any>>({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
    },
  });

  const updateProfileDataMutation = useMutation<any, Error, Partial<any>>({
    mutationFn: updateProfileData,
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
    connections: getConnectionsQuery.data,
    updateProfile: updateProfileMutation.mutate,
    getAllProfiles: useGetAllProfiles.data,
    getProfileById: getProfileByIdQuery.data,
    isUpdating: updateProfileMutation.isPending,
    updateProfileData: updateProfileDataMutation.mutate,
    isUpdatingProfileData: updateProfileDataMutation.isPending,
  };
}
