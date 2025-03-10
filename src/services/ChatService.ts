import http from "../utils/http";

const fetchChatList = async (userId: string) => {
  const { data } = await http.get(`/users/${userId}/chatlist`);
  return data;
};

const fetchMessages = async (
  chatId: string,
  options?: { limit?: number; before?: string }
) => {
  const params = new URLSearchParams();
  if (options?.limit) params.append("limit", String(options.limit));
  if (options?.before) params.append("before", options.before);

  const { data } = await http.get(
    `/chatrooms/${chatId}/messages?${params.toString()}`
  );
  return data;
};

const sendMessage = async (
  chatId: string,
  payload: { sender: string; text: string }
) => {
  const { data } = await http.post(`/chatrooms/${chatId}/messages`, payload);
  return data;
};

const markMessagesAsRead = async (
  chatId: string,
  payload: { userId: string; messageIds: string[] }
) => {
  const { data } = await http.put(
    `/chatrooms/${chatId}/messages/mark-read`,
    payload
  );
  return data;
};

const updateLastOpened = async (chatId: string, userId: string) => {
  const { data } = await http.put(`/chatrooms/${chatId}/last-opened`, {
    userId,
  });
  return data;
};

export {
  fetchChatList,
  fetchMessages,
  sendMessage,
  markMessagesAsRead,
  updateLastOpened,
};
