import { useCallback, useState } from "react";
import { fetchMessages } from "@/services/ChatService";
import { MessageType } from "@/types/entities/MessageTypes";

export const useLoadMoreMessages = (
  chatId: string,
  messages: MessageType[],
  setMessages: (chatId: string, messages: MessageType[]) => void,
  hasMore: boolean,
  setHasMore: (chatId: string, hasMore: boolean) => void,
  initialLimit: number
) => {
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMoreMessages = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);

    const oldest = messages[0];
    if (!oldest) {
      setLoadingMore(false);
      return;
    }

    const data = await fetchMessages(chatId, {
      limit: initialLimit,
      before: oldest.createdAt,
    });

    if (data.length === 0) {
      setHasMore(chatId, false);
    } else {
      setMessages(chatId, [...data, ...messages]);
    }

    setLoadingMore(false);
  }, [chatId, messages, hasMore, loadingMore, initialLimit, setMessages, setHasMore]);

  return { loadMoreMessages, loadingMore };
};