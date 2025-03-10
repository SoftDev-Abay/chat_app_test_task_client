import { useEffect } from "react";
import { fetchChatList } from "@/services/ChatService";
import { UseUserStore } from "@/store/useUserStore";
import { useChatStore } from "@/store/useChatStore";

export const useFetchChatList = () => {
  const user = UseUserStore((state) => state.currentUser);
  const { setChatList } = useChatStore();

  useEffect(() => {
    async function load() {
      if (user?.id) {
        const data = await fetchChatList(user.id);
        console.log("Chat list", data);
        setChatList(data);
      }
    }
    load();
  }, [user, setChatList]);
};
