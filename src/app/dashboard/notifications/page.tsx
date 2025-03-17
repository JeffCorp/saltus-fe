"use client";

import { useNotifications } from "@/services/useNotifications";
import { timeAgo } from "@/utils";
import { useSession } from "next-auth/react";

const NotificationPage = () => {
  const { data: session } = useSession();

  const { notifications } = useNotifications(session?.user?.id);

  console.log(notifications);
  return (
    <div className="w-full mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Notifications</h1>
        <button className="text-sm text-blue-400 hover:text-blue-300">
          Mark all as read
        </button>
      </div>
      <div className="space-y-3">
        {notifications?.map((notification) => (
          <NotificationItem
            key={notification._id}
            icon="🎯"
            title={notification.title}
            message={notification.message}
            time={notification.createdAt ? timeAgo(notification.createdAt) : ""}
            isRead={notification.read}
            actionButton={notification.data?.actionButton}
          />
        ))}
        <NotificationItem
          icon="🔥"
          title="3 Day Streak!"
          message="You're on fire! Keep learning to maintain your streak."
          time="1 day ago"
          isRead={false}
          actionButton="Practice Now"
        />
        <NotificationItem
          icon="📚"
          title="New Course Available"
          message="We've added a new course that might interest you."
          time="2 days ago"
          isRead={true}
          actionButton="Check it out"
        />
      </div>
    </div>
  );
};

// Notification item component
const NotificationItem = ({
  icon,
  title,
  message,
  time,
  isRead,
  actionButton,
}: {
  icon: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionButton?: string;
}) => {
  return (
    <div
      className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md
        ${isRead ? 'bg-gray-800 border-gray-700' : 'bg-gray-900 border-blue-900'}`}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gray-700">
          <span className="text-xl">{icon}</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-white">{title}</h3>
            <span className="text-sm text-gray-400">{time}</span>
          </div>
          <p className="text-gray-300 mt-1 mb-3">{message}</p>
          {actionButton && (
            <button className="text-sm font-medium px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors">
              {actionButton}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
