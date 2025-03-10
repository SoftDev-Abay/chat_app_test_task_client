import { useSocket } from "@/context/SocketContext";
import { sendMessage as sendMessageService } from "@/services/ChatService";
import { MessageType } from "@/types/entities/MessageTypes";
export const useSendMessage = (chatId: string) => {
  const { socket } = useSocket();

  const sendMessage = async (payload: { sender: string; text: string }) => {
    try {
      const newMsg = await sendMessageService(chatId, payload);
      socket?.emit("new_message", { chatroomId: chatId, message: newMsg });
      return newMsg as MessageType;
    } catch (error) {
      console.error("Error sending message", error);
      throw error;
    }
  };

  return { sendMessage };
};
