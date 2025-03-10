"use client";

import React from "react";
import { formatChatDate } from "@/utils/helpers";
import { useHasMounted } from "@/hooks/useHasMounted";
import Image from "next/image";

export type ChatMessageProps = {
  sender: string;
  message: string;
  time: string;
  read: boolean;
  avatarUrl?: string;
  personal?: boolean;
  isCurrentUser?: boolean;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  message,
  time,
  read,
  avatarUrl,
  personal,
  isCurrentUser,
}) => {
  const hasMounted = useHasMounted();
  const formattedDate = hasMounted ? formatChatDate(time) : "";

  return (
    <div
      className={`flex gap-2.5 items-start  ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      {avatarUrl ? (
        <Image
          className="w-8 h-8 rounded-full"
          src={avatarUrl}
          alt={`${sender}'s avatar`}
        />
      ) : null}
      <div
        className={`flex flex-col max-w-[320px] leading-1.5 px-4 py-3 
      ${
        isCurrentUser
          ? "bg-blue-200 rounded-xl rounded-tr-none"
          : "bg-gray-300 rounded-xl rounded-tl-none"
      }`}
      >
        {!isCurrentUser && !personal && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {sender}
            </span>
          </div>
        )}

        <p className="text-sm font-normal py-2 text-gray-900 dark:text-white">
          {message}
        </p>
        <div className="flex justify-end gap-2">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {formattedDate}
          </span>
          {isCurrentUser && (
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {read ? "✓✓" : "✓"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
