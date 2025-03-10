import { MessageType } from "./MessageTypes";

export type ChatroomType = {
  id: string;
  title: string;
  members: string[];
  typing_members: string[];
  lastOpened: {
    userId: string;
    date: string;
  }[];
  type: "personal" | "public";
};

export type ChatUserType = ChatroomType & {
  unreadCount: number;
  lastMessage: MessageType | null;
};
