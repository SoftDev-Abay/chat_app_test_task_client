import { useChatStore } from "@/store/useChatStore";
import { useFetchChatList } from "./useFetchChatList";
import { useSocketChatUpdates } from "./useSocketChatUpdates";
import { useShallow } from "zustand/shallow";

export const useChatList = () => {
  const { chatList } = useChatStore(
    useShallow((state) => ({
      chatList: state.chatList,
    }))
  );

  useFetchChatList();

  useSocketChatUpdates();

  return { chatList };
};
