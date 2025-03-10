"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatTopBar from "@/pages/Chat/ChatTopBar";
import ChatMessage from "@/pages/Chat/ChatMessage";
import ChatInput from "@/pages/Chat/ChatInput";
import { useChatMessages } from "@/hooks/useChatMessages";
import { UseUserStore } from "@/store/useUserStore";
import { useParams } from "next/navigation";
import useScrollToElement from "@/hooks/useScrollToElement";
import InfiniteScrollObserver from "@/components/InfiniteScrollObserver";
import { useJoinChatroom } from "@/hooks/useJoinChatroom";
import { useSocket } from "@/context/SocketContext";
import ChatsBar from "@/pages/Chat/ChatsBar";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function ChatPage() {
  const params = useParams();
  const chatId = Array.isArray(params?.chatId)
    ? params.chatId[0]
    : params?.chatId;
  const { elementRef, scrollToElement } = useScrollToElement();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { socket } = useSocket();
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(true);

  const { messages, sendMessage, loadMoreMessages, hasMore, isLoading } =
    useChatMessages(chatId ?? "", scrollToElement);

  const user = UseUserStore((state) => state.currentUser);

  useJoinChatroom(chatId ?? null);

  useEffect(() => {
    if (!socket || !chatId) return;

    const handleTyping = ({
      userId,
      typing,
    }: {
      userId: string;
      typing: boolean;
      chatroomId: string;
    }) => {
      setTypingUsers((prev) =>
        typing
          ? [...prev.filter((id) => id !== userId), userId]
          : prev.filter((id) => id !== userId)
      );
    };

    socket.on("typing", handleTyping);
    return () => {
      socket.off("typing", handleTyping);
    };
  }, [socket, chatId]);

  const handleLoadMoreMessages = async () => {
    if (!hasMore) return;
    if (!scrollContainerRef.current) return;
    const previousScrollHeight = scrollContainerRef.current.scrollHeight;

    console.log("Loading more messages");
    await loadMoreMessages();

    setTimeout(() => {
      if (!scrollContainerRef.current) return;
      const newScrollHeight = scrollContainerRef.current.scrollHeight;
      scrollContainerRef.current.scrollTop +=
        newScrollHeight - previousScrollHeight;
    }, 0);
  };

  const isMobile = useMediaQuery("(max-width: 640px)");

  const showChatsBar = isMobile ? isChatOpen : true;
  const showMessages = isMobile ? !isChatOpen : true;

  return (
    <div className="flex w-screen h-screen text-gray-700">
      {showChatsBar && <ChatsBar setIsChatOpen={setIsChatOpen} />}
      {showMessages && (
        <div className="flex flex-col flex-grow">
          <ChatTopBar
            username={chatId ? chatId : "Template Name"}
            typingUsers={typingUsers}
            setIsChatOpen={setIsChatOpen}
          />
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto bg-gray-100 pt-6 px-6"
          >
            <div className="flex flex-col space-y-2">
              {!isLoading && (
                <InfiniteScrollObserver
                  onIntersect={handleLoadMoreMessages}
                  className="h-2"
                  enabled={!isLoading}
                />
              )}

              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  sender={msg.sender}
                  message={msg.text}
                  time={msg.createdAt}
                  read={msg.readBy.includes(user?.id ?? "")}
                  isCurrentUser={msg.sender === user?.id}
                />
              ))}

              <div className="pb-6" ref={elementRef}></div>
            </div>
          </div>
          {chatId && <ChatInput chatId={chatId} sendMessage={sendMessage} />}
        </div>
      )}
    </div>
  );
}
