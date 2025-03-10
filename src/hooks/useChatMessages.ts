import { useChatStore } from "@/store/useChatStore";
import { useInitialMessages } from "./useInitialMessages";
import { useLoadMoreMessages } from "./useLoadMoreMessages";
import { useSocketMessages } from "./useSocketMessages";
import { useSendMessage } from "./useSendMessage";
import { useShallow } from "zustand/shallow";

export const useChatMessages = (
  chatId: string,
  scrollToElement: () => void,
  initialLimit = 10
) => {
  const messages = useChatStore(
    useShallow((state) => (chatId ? state.messages[chatId] || [] : []))
  );

  const hasMore = useChatStore(
    useShallow((state) => state.hasMore[chatId] || true)
  );

  const isLoading = useChatStore(
    useShallow((state) => state.isLoading[chatId] || false)
  );

  const { setMessages, setHasMore } = useChatStore();

  useInitialMessages(chatId, initialLimit, scrollToElement);

  const { loadMoreMessages, loadingMore } = useLoadMoreMessages(
    chatId,
    messages,
    setMessages,
    hasMore,
    setHasMore,
    initialLimit
  );

  useSocketMessages(chatId, scrollToElement);

  const { sendMessage } = useSendMessage(chatId);

  return {
    messages,
    sendMessage,
    loadMoreMessages,
    hasMore,
    isLoading,
    loadingMore,
  };
};
