import apiClient from "@/lib/api-client";
import { useSocket } from "@/lib/socket";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface Notification {
  _id: string;
  userId: string;
  type:
    | "mentorship_request"
    | "mentorship_accepted"
    | "mentorship_declined"
    | "message";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: any;
}

export function useNotifications(userId?: string) {
  const queryClient = useQueryClient();
  const socket = useSocket();
  const toast = useToast();

  // Fetch notifications
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/notifications/${userId}`);
      return data as Notification[];
    },
    enabled: !!userId,
  });

  // Mark notification as read
  const { mutate: markAsRead } = useMutation({
    mutationFn: async (notificationId: string) => {
      const { data } = await apiClient.patch(
        `/notifications/${notificationId}/read`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  // Delete notification
  const { mutate: deleteNotification } = useMutation({
    mutationFn: async (notificationId: string) => {
      const { data } = await apiClient.delete(
        `/notifications/${notificationId}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  // WebSocket integration
  useEffect(() => {
    if (!socket || !userId) return;

    // Listen for new notifications
    socket.on("notification", (notification: Notification) => {
      console.log("Notification =>", notification);
      // Update notifications cache
      queryClient.setQueryData<Notification[]>(
        ["notifications", userId],
        (old) => (old ? [notification, ...old] : [notification])
      );

      // Show toast notification
      toast({
        title: notification.title,
        description: notification.message,
        status: "info",
        duration: 50000,
        isClosable: true,
        position: "top-right",
      });
    });

    return () => {
      socket.off("notification");
    };
  }, [socket, userId, queryClient, toast]);

  return {
    notifications: notifications || [],
    unreadCount: notifications?.filter((n) => !n.read).length || 0,
    isLoading,
    markAsRead,
    deleteNotification,
  };
}
