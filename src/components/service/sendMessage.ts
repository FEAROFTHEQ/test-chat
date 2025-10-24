import type { Message } from "./../../types/userInfo";
import axios from "axios";
import { API_BASE_URL } from "./api.ts";

export default async function sendMessage(
  chatId: string,
  messageContent: string,
  senderOfMessage: "user" | "system"
): Promise<Message> {
  const { data } = await axios.post<Message>(
    `${API_BASE_URL}/chats/${chatId}/messages`,
    { content: messageContent, senderOfMessage }
  );

  return data;
}
