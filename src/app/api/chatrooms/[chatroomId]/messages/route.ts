import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { IntristicMessageType } from "@/types/entities/MessageTypes";
import { ChatroomType } from "@/types/entities/ChatroomTypes";

const messagesFilePath = path.join(
  process.cwd(),
  "src",
  "data",
  "messages.json"
);
const chatroomsFilePath = path.join(
  process.cwd(),
  "src",
  "data",
  "chatrooms.json"
);

function readMessages(): IntristicMessageType[] {
  const data = fs.readFileSync(messagesFilePath, "utf8");
  return JSON.parse(data) as IntristicMessageType[];
}

function readChatrooms(): ChatroomType[] {
  const data = fs.readFileSync(chatroomsFilePath, "utf8");
  return JSON.parse(data) as ChatroomType[];
}

function writeMessages(messages: IntristicMessageType[]) {
  fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ chatroomId: string }> }
) {
  const chatroomId = (await params).chatroomId;

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "25");
  const before = searchParams.get("before");

  let chatMessages = readMessages().filter((m) => m.chatroom_id === chatroomId);

  if (before) {
    const beforeTime = new Date(before).getTime();
    chatMessages = chatMessages.filter(
      (m) => new Date(m.createdAt).getTime() < beforeTime
    );
  }

  chatMessages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const paginated = chatMessages.slice(0, limit);

  paginated.reverse();

  const chatrooms = readChatrooms();
  const chatroom = chatrooms.find((c) => c.id === chatroomId);

  if (chatroom) {
    const messagesWithReadStatus = paginated.map((msg) => {
      const readBy = chatroom.lastOpened
        .filter((lo) => {
          if (!lo.userId) return false;

          return (
            new Date(lo.date).getTime() >= new Date(msg.createdAt).getTime()
          );
        })
        .map((lo) => lo.userId);

      return {
        ...msg,
        readBy: readBy.length > 0 ? readBy : [],
      };
    });

    return NextResponse.json(messagesWithReadStatus);
  }

  return NextResponse.json(paginated);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ chatroomId: string }> }
) {
  const { sender, text } = await request.json();
  const messages = readMessages();
  const chatroomId = (await params).chatroomId;


  const newMessage: IntristicMessageType = {
    id: String(Date.now()),
    chatroom_id: chatroomId,
    text,
    sender,
    createdAt: new Date().toISOString(),
  };

  messages.push(newMessage);
  writeMessages(messages);

  return NextResponse.json(newMessage, { status: 201 });
}
