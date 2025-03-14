import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket | null = null;

export function useSocket() {
  const { data: session } = useSession();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;

    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001", {
        auth: {
          userId: session.user.id,
        },
      });
    }

    socket.on("connect", () => {
      console.log("Notification => Connected to socket");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, [session?.user?.id]);

  return socket;
}
