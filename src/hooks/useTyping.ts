import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { UseUserStore } from "@/store/useUserStore";

interface UseTypingProps {
  chatId: string;
  message: string;
}

export default function useTyping({ chatId, message }: UseTypingProps) {
  const [isTyping, setIsTyping] = useState(false);
  const { socket } = useSocket();
  const user = UseUserStore((state) => state.currentUser);

  useEffect(() => {
    if (!socket || !chatId || !user?.id) return;

    if (message.trim() !== "" && !isTyping) {
      socket.emit("typing", {
        chatroomId: chatId,
        userId: user.id,
        typing: true,
      });
      setIsTyping(true);
    }

    if (message.trim() === "" && isTyping) {
      socket.emit("typing", {
        chatroomId: chatId,
        userId: user.id,
        typing: false,
      });
      setIsTyping(false);
    }

    const timeoutId = setTimeout(() => {
      if (isTyping) {
        socket.emit("typing", {
          chatroomId: chatId,
          userId: user.id,
          typing: false,
        });
        setIsTyping(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [message, socket, chatId, user?.id, isTyping]);

  return isTyping;
}
