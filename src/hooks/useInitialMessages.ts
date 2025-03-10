import { useEffect } from "react";
import { fetchMessages } from "@/services/ChatService";
import { useChatStore } from "@/store/useChatStore";

export const useInitialMessages = (
  chatId: string,
  initialLimit: number,
  scrollToElement: () => void
) => {
  const { setMessages, setHasMore, setIsLoading } = useChatStore();

  useEffect(() => {
    if (!chatId) return;

    const loadInitialMessages = async () => {
      setIsLoading(chatId, true);
      const data = await fetchMessages(chatId, { limit: initialLimit });
      setMessages(chatId, data);
      setHasMore(chatId, data.length === initialLimit);
      setIsLoading(chatId, false);
      setTimeout(() => {
        scrollToElement();
      }, 100);

      console.log("Initial messages loaded");
    };

    loadInitialMessages();
  }, [chatId, initialLimit, scrollToElement, setMessages, setHasMore, setIsLoading]);
};