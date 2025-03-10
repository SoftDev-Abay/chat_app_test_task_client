export type MessageType = {
  id: string;
  chatroom_id: string;
  text: string;
  sender: string; 
  readBy: string[]; 
  createdAt: string;
};

export type IntristicMessageType = {
  id: string;
  chatroom_id: string;
  text: string;
  sender: string; 
  createdAt: string;
};
