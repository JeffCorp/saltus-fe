import apiClient from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

async function fetchUsers() {
  const response = await apiClient.get(`/users`);
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return response.data;
}

function useUsers() {
  const getUsers = useMutation({
    mutationFn: () => fetchUsers(),
    onSuccess: () => {},
    onError: (error) => {
      console.error("Error fetching users:", error);
    },
  });

  return { ...getUsers };
}

export default useUsers;
