import { create } from "zustand";
import { MessageType } from "@/types/entities/MessageTypes";
import { ChatUserType } from "@/types/entities/ChatroomTypes";

interface ChatStore {
  chatList: ChatUserType[];
  setChatList: (
    updater: ChatUserType[] | ((prev: ChatUserType[]) => ChatUserType[])
  ) => void;

  messages: Record<string, MessageType[]>;
  setMessages: (chatId: string, messages: MessageType[]) => void;
  addMessage: (chatId: string, message: MessageType) => void;
  markMessagesAsRead: (
    chatId: string,
    userId: string,
    messageIds: string[]
  ) => void;

  hasMore: Record<string, boolean>;
  isLoading: Record<string, boolean>;
  setHasMore: (chatId: string, hasMore: boolean) => void;
  setIsLoading: (chatId: string, isLoading: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chatList: [],
  setChatList: (updater) =>
    set((state) => ({
      chatList:
        typeof updater === "function" ? updater(state.chatList) : updater,
    })),

  messages: {},
  setMessages: (chatId, messages) =>
    set((state) => ({
      messages: { ...state.messages, [chatId]: messages },
    })),
  addMessage: (chatId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), message],
      },
    })),
  markMessagesAsRead: (chatId, userId, messageIds) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: state.messages[chatId]?.map((msg) =>
          messageIds.includes(msg.id)
            ? { ...msg, readBy: [...msg.readBy, userId] }
            : msg
        ),
      },
    })),

  hasMore: {},
  isLoading: {},
  setHasMore: (chatId, hasMore) =>
    set((state) => ({
      hasMore: { ...state.hasMore, [chatId]: hasMore },
    })),
  setIsLoading: (chatId, isLoading) =>
    set((state) => ({
      isLoading: { ...state.isLoading, [chatId]: isLoading },
    })),
}));
