import { useEffect } from "react";
import { useSocket } from "@/context/SocketContext";
import { UseUserStore } from "@/store/useUserStore";
import { useChatStore } from "@/store/useChatStore";
import { MessageType } from "@/types/entities/MessageTypes";
export const useSocketChatUpdates = () => {
  const { socket } = useSocket();
  const user = UseUserStore((state) => state.currentUser);
  const { setChatList } = useChatStore();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMsg: MessageType) => {
      setChatList((prev) =>
        prev.map((chat) => {
          if (chat.id === newMsg.chatroom_id) {
            const updatedUnread =
              newMsg.sender !== user?.id ? chat.unreadCount + 1 : 0;
            return {
              ...chat,
              lastMessage: newMsg,
              unreadCount: updatedUnread,
            };
          }
          return chat;
        })
      );
    };

    const handleMessagesRead = ({ chatroom_id }: { chatroom_id: string }) => {
      setChatList((prev) =>
        prev.map((chat) =>
          chat.id === chatroom_id ? { ...chat, unreadCount: 0 } : chat
        )
      );
    };

    socket.on("new_message", handleNewMessage);
    socket.on("messages_read", handleMessagesRead);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("messages_read", handleMessagesRead);
    };
  }, [socket, user, setChatList]);
};
