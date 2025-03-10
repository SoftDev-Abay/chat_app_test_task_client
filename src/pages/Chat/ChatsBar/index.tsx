"use client";
import React from "react";
import ChatBarItem from "./ChatBarItem";
import { useChatList } from "@/hooks/useChatList";
import SearchInput from "@/components/SearchInput";

type ChatsBarProps = {
  className?: string;
  setIsChatOpen?: React.Dispatch<React.SetStateAction<boolean>>;
} & React.HTMLAttributes<HTMLDivElement>;

const ChatsBar: React.FC<ChatsBarProps> = ({ setIsChatOpen }) => {
  const { chatList } = useChatList();

  return (
    <div className="flex flex-col w-100 border-r border-gray-300 max-md:w-50 max-lg:w-70 max-sm:w-full">
      <div className="flex items-center justify-between w-full h-16 px-4 border-b border-gray-300 ">
        <SearchInput />
      </div>
      <div className="flex flex-col flex-grow overflow-auto">
        {chatList.map((item, index) => (
          <ChatBarItem
            key={index}
            id={item.id}
            name={item.id}
            lastMessage={item.lastMessage}
            unreadCount={item.unreadCount}
            handleClick={() => {
              if (setIsChatOpen) setIsChatOpen(false);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatsBar;
