"use client";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useTyping from "@/hooks/useTyping";
import { UseUserStore } from "@/store/useUserStore";
import { MessageType } from "@/types/entities/MessageTypes";

interface ChatInputProps {
  chatId: string;
  sendMessage: (payload: {
    sender: string;
    text: string;
  }) => Promise<MessageType>;
}

const ChatInput: React.FC<ChatInputProps> = ({ chatId, sendMessage }) => {
  const [message, setMessage] = useState("");

  useTyping({ chatId, message });

  const user = UseUserStore((state) => state.currentUser);

  const handleSend = async () => {
    if (!message.trim()) return;
    const payload = { sender: user?.id ?? "", text: message };
    await sendMessage(payload);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="bg-white p-4 flex items-center">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className="bg-blue-500 text-white rounded-full px-2.5 pl-3 py-2.5 ml-2 hover:bg-blue-600 focus:outline-none"
        onClick={handleSend}
      >
        <IoSend size={18} />
      </button>
    </div>
  );
};

export default ChatInput;
