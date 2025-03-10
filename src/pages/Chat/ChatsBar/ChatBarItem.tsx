"use client";

import React from "react";
import { Badge } from "@/components/Badge";
import Link from "next/link";
import { formatChatDate } from "@/utils/helpers";
import { useHasMounted } from "@/hooks/useHasMounted";
import { MessageType } from "@/types/entities/MessageTypes";
import Image from "next/image";

export type ChatBarItemProps = {
  id: string;
  avatar?: string;
  name: string;
  lastMessage: MessageType | null;
  unreadCount: number;
  handleClick?: () => void;
};

const ChatBarItem: React.FC<ChatBarItemProps> = ({
  id,
  name,
  lastMessage,
  unreadCount,
  handleClick,
}) => {
  const hasMounted = useHasMounted();

  const formattedDate =
    hasMounted && lastMessage?.createdAt
      ? formatChatDate(lastMessage.createdAt)
      : "";

  return (
    <Link
      className="flex gap-3 items-stretch flex-shrink-0 px-4 py-3 text-sm font-medium hover:bg-gray-100 cursor-pointer"
      href={`/chat/${id}`}
      onClick={handleClick}
    >
      <Image
        width={44}
        height={44}
        className="w-11 h-11 rounded-full"
        src={"/images/profile.jpg"}
        alt={`${name}'s avatar`}
      />
      <div className="grow flex flex-col justify-between py-0.5">
        <div className="flex justify-between items-center">
          <span className="leading-none font-semibold text-base">
            {name || id}
          </span>
          <span className="leading-none text-gray-500">{formattedDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="leading-none text-[#c4cacc]">
            {lastMessage?.text || ""}
          </span>
          {unreadCount > 0 && (
            <Badge className="bg-gray-300 rounded-xl px-2 py-1">
              <span className="leading-none text-white">{unreadCount}</span>
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChatBarItem;
