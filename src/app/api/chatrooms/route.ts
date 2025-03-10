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

function readChatRooms(): ChatroomType[] {
  const data = fs.readFileSync(chatroomsFilePath, "utf8");
  return JSON.parse(data) as ChatroomType[];
}

export async function GET() {
  return NextResponse.json(readChatRooms());
}
