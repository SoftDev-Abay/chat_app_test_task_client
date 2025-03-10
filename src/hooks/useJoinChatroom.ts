import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { UseUserStore } from "@/store/useUserStore";

export const useJoinChatroom = (chatId: string | null) => {
  const { socket } = useSocket();
  const user = UseUserStore((state) => state.currentUser);
  const [activeChatroom, setActiveChatroom] = useState<string | null>(null);

  useEffect(() => {
    if (!socket || !chatId || !user?.id) return;

    socket.emit("join_chat", { chatroomId: chatId, userId: user.id });
    setActiveChatroom(chatId);

    return () => {
      socket.emit("leave_chat", { chatroomId: chatId, userId: user.id });
      setActiveChatroom(null);
    };
  }, [socket, chatId, user?.id]);

  return { activeChatroom };
};