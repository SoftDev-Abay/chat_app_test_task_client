import React from "react";
import {
  FaMagnifyingGlass,
  FaPhone,
  FaEllipsisVertical,
  FaArrowLeft,
} from "react-icons/fa6";
export type ChatTopBarProps = {
  username: string;
  typingUsers?: string[];
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatTopBar: React.FC<ChatTopBarProps> = ({
  username,
  typingUsers,
  setIsChatOpen,
}) => {
  return (
    <div className="px-6 min-sm:px-8 flex items-center flex-shrink-0 h-16  border-b border-gray-300">
      <button
        onClick={() => {
          setIsChatOpen(true);
        }}
        className="min-sm:hidden mr-4 flex items-center justify-center h-10 text-sm font-medium cursor-pointer"
      >
        <FaArrowLeft />
      </button>

      <h1 className="text-lg font-semibold">{username}</h1>
      {typingUsers?.length ? (
        <p className="ml-2 text-sm text-gray-500">
          {typingUsers.join(", ")} is typing...
        </p>
      ) : null}

      <button className="flex items-center justify-center h-10 px-4 ml-auto text-sm font-medium rounded hover:bg-gray-200 cursor-pointer">
        <FaMagnifyingGlass />
      </button>
      <button className="flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium rounded hover:bg-gray-200 cursor-pointer">
        <FaPhone />
      </button>
      <button className="flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium rounded hover:bg-gray-200 cursor-pointer">
        <FaEllipsisVertical />
      </button>
    </div>
  );
};

export default ChatTopBar;
