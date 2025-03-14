"use client"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/services/useNotifications";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Check, MessageSquare, Trash2, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function NotificationsDropdown() {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    deleteNotification
  } = useNotifications(session?.user?.id);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'mentorship_request':
      case 'mentorship_accepted':
      case 'mentorship_declined':
        return <Users className="w-4 h-4 text-[#8A2EFF]" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-[#1CB0F6]" />;
      default:
        return <Bell className="w-4 h-4 text-[#58CC02]" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" className="relative">
          <Bell className="w-5 h-5 text-gray-400" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF4B4B] text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[380px] bg-[#1A1A1A] border-[#333333] text-white p-2">
        <div className="flex items-center justify-between px-2 py-2 border-b border-[#333333]">
          <Text fontWeight="bold">Notifications</Text>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              className="text-[#8A2EFF] hover:text-[#7325D4] text-sm"
              onClick={() => notifications.forEach(n => !n.read && markAsRead(n._id))}
            >
              Mark all as read
            </Button>
          )}
        </div>

        <div className="max-h-[400px] overflow-y-auto py-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Spinner size="sm" color="#8A2EFF" />
            </div>
          ) : notifications.length > 0 ? (
            <AnimatePresence>
              {notifications.map((notification) => (
                <motion.div
                  key={notification._id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-3 hover:bg-[#222222] rounded-lg cursor-pointer relative group ${!notification.read ? 'bg-[#8A2EFF]/5' : ''
                    }`}
                  onClick={() => {
                    if (!notification.read) markAsRead(notification._id);
                    if (notification.data?.link) router.push(notification.data.link);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <Box className="p-2 rounded-lg bg-[#222222]">
                      {getNotificationIcon(notification.type)}
                    </Box>
                    <div className="flex-1">
                      <Text fontWeight={!notification.read ? "bold" : "normal"}>
                        {notification.title}
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        {notification.message}
                      </Text>
                      <Text fontSize="xs" color="gray.500" mt={1}>
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </Text>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.read ? (
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification._id);
                          }}
                          className="text-[#58CC02] hover:text-[#46a102]"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification._id);
                          }}
                          className="text-[#FF4B4B] hover:text-[#cc3c3c]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No notifications
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 