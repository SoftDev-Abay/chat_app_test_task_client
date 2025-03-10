import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { UserType } from "@/types/entities/UserTypes";
import { ChatroomType } from "@/types/entities/ChatroomTypes";
import { MessageType } from "@/types/entities/MessageTypes";

const usersFilePath = path.join(process.cwd(), "src", "data", "users.json");
const chatroomsFilePath = path.join(
  process.cwd(),
  "src",
  "data",
  "chatrooms.json"
);
const messagesFilePath = path.join(
  process.cwd(),
  "src",
  "data",
  "messages.json"
);

function readJSON<T>(filePath: string): T {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data) as T;
}

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const users = readJSON<UserType[]>(usersFilePath);
  const chatrooms = readJSON<ChatroomType[]>(chatroomsFilePath);
  const messages = readJSON<MessageType[]>(messagesFilePath);

  const user = users.find((u) => u.id === params.userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const chatList = user.chatrooms_id
    .map((chatId) => {
      const chatroom = chatrooms.find((c) => c.id === chatId);
      if (!chatroom) return null;

      const chatMessages = messages.filter((m) => m.chatroom_id === chatId);
      const lastMessage =
        chatMessages.length > 0
          ? chatMessages.reduce((prev, curr) =>
              new Date(prev.createdAt) > new Date(curr.createdAt) ? prev : curr
            )
          : null;

      const userLastOpened = chatroom.lastOpened.find(
        (lo) => lo.userId === user.id
      );
      const lastOpenedTime = userLastOpened
        ? new Date(userLastOpened.date).getTime()
        : 0;

      const unreadCount = chatMessages.reduce((count, msg) => {
        return new Date(msg.createdAt).getTime() > lastOpenedTime
          ? count + 1
          : count;
      }, 0);

      return {
        ...chatroom,
        lastMessage,
        unreadCount,
      };
    })
    .filter(Boolean);

  return NextResponse.json(chatList);
}
