import { useEffect } from "react";
import { useSocket } from "@/context/SocketContext";
import { useChatStore } from "@/store/useChatStore";
import { MessageType } from "@/types/entities/MessageTypes";

export const useSocketMessages = (chatId: string, scrollToElement: () => void) => {
  const { socket } = useSocket();
  const { addMessage, markMessagesAsRead } = useChatStore();

  useEffect(() => {
    if (!socket || !chatId) return;

    const handleNewMessage = (newMsg: MessageType) => {
      if (newMsg.chatroom_id === chatId) {
        addMessage(chatId, newMsg);
        setTimeout(() => {
          scrollToElement();
        }, 100);
      }
    };

    const handleMessagesRead = ({
      userId,
      messageIds,
    }: {
      userId: string;
      messageIds: string[];
    }) => {
      markMessagesAsRead(chatId, userId, messageIds);
    };

    socket.on("new_message", handleNewMessage);
    socket.on("messages_read", handleMessagesRead);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("messages_read", handleMessagesRead);
    };
  }, [socket, chatId, addMessage, markMessagesAsRead, scrollToElement]);
};