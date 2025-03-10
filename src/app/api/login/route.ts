import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { UserType } from "@/types/entities/UserTypes";

const usersFilePath = path.join(process.cwd(), "src", "data", "users.json");

function readUsers(): UserType[] {
  const data = fs.readFileSync(usersFilePath, "utf8");
  return JSON.parse(data) as UserType[];
}

function writeUsers(users: UserType[]) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

export async function POST(request: Request) {
  const { username } = await request.json();
  const users = readUsers();
  let user = users.find((u) => u.username === username);
  if (!user) {
    user = { id: String(Date.now()), username: username, chatrooms_id: [] };
    users.push(user);
    writeUsers(users);
  }
  return NextResponse.json(user);
}
