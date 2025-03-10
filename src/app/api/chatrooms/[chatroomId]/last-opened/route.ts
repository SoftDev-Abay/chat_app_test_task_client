import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ChatroomType } from "@/types/entities/ChatroomTypes";

const chatroomsFilePath = path.join(
  process.cwd(),
  "src",
  "data",
  "chatrooms.json"
);

function readChatrooms(): ChatroomType[] {
  const data = fs.readFileSync(chatroomsFilePath, "utf8");
  return JSON.parse(data) as ChatroomType[];
}

function writeChatrooms(chatrooms: ChatroomType[]) {
  fs.writeFileSync(chatroomsFilePath, JSON.stringify(chatrooms, null, 2));
}

export async function PUT(
  request: Request,
  { params }: { params: { chatroomId: string } }
): Promise<Response> {
  const { chatroomId } = params;
  const { userId } = await request.json();

  const chatrooms = readChatrooms();
  const chatroom = chatrooms.find((c) => c.id === chatroomId);

  if (!chatroom) {
    return NextResponse.json({ error: "Chatroom not found" }, { status: 404 });
  }

  const now = new Date().toISOString();
  const userLastOpened = chatroom.lastOpened.find((lo) => lo.userId === userId);

  if (userLastOpened) {
    userLastOpened.date = now;
  } else {
    chatroom.lastOpened.push({ userId, date: now });
  }

  writeChatrooms(chatrooms);
  return NextResponse.json({ success: true });
}
