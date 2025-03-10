import apiClient from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export enum ConnectionStatus {
  PENDING = "Pending",
  REJECTED = "Rejected",
  APPROVED = "Approved",
}

async function fetchUserConnections() {
  const response = await apiClient.get(`/connections`);
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return response.data;
}

async function fetchUserTopConnections() {
  const response = await apiClient.get(`/connections/top`);
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return response.data;
}

async function fetchUserPendingConnections() {
  const response = await apiClient.get(`/connections/pending`);
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return response.data;
}

async function addConnection(connectionData: {
  requester: string;
  recipient: string;
}) {
  const response = await apiClient.post(`/connections`, connectionData);
  if (response.status !== 200) {
    throw new Error("Failed to add connection");
  }
  return response.data;
}

async function acceptConnection(connectionData: { _id: string }) {
  const response = await apiClient.patch(
    `/connections/${connectionData._id}/status`,
    {
      status: ConnectionStatus.APPROVED,
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to accept connection");
  }
  return response.data;
}

async function rejectConnection(connectionData: { _id: string }) {
  const response = await apiClient.patch(
    `/connections/${connectionData._id}/status`,
    {
      status: ConnectionStatus.REJECTED,
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to reject connection");
  }
}

export const useGetConnections = () =>
  useMutation({
    mutationFn: () => fetchUserConnections(),
    onSuccess: () => {},
    onError: (error) => {
      console.error("Error fetching user connections:", error);
    },
  });

export const useGetTopConnections = () =>
  useMutation({
    mutationFn: () => fetchUserTopConnections(),
    onSuccess: () => {},
    onError: (error) => {
      console.error("Error fetching user connections:", error);
    },
  });

export const useGetPendingConnections = () =>
  useMutation({
    mutationFn: () => fetchUserPendingConnections(),
    onSuccess: () => {},
    onError: (error) => {
      console.error("Error fetching user connections:", error);
    },
  });

export const useAddConnection = () =>
  useMutation({
    mutationFn: (connectionData: any) => addConnection(connectionData),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["userConnections", userId] });
    },
    onError: (error) => {
      console.error("Error adding connection:", error);
    },
  });

export const useAcceptConnection = () =>
  useMutation({
    mutationFn: (connectionData: any) => acceptConnection(connectionData),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["userConnections", userId] });
    },
    onError: (error) => {
      console.error("Error adding connection:", error);
    },
  });

export const useRejectConnection = () =>
  useMutation({
    mutationFn: (connectionData: any) => rejectConnection(connectionData),
    onSuccess: () => {},
    onError: (error) => {
      console.error("Error rejecting connection:", error);
    },
  });
