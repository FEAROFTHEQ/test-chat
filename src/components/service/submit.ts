import axios from "axios";
import { API_BASE_URL } from "./api.ts";
import type { Chat } from "../../types/userInfo.ts";

interface createChatData {
  userData: { firstName: string; lastName: string };
}

interface EditChatParams {
  firstName: string;
  lastName: string;
  chatId: string;
}

export async function createChat(
  userData: createChatData,
  userId: string
): Promise<Chat> {
  const response = await axios.post<Chat>(
    `${API_BASE_URL}/create/${userId}`,
    userData
  );
  return response.data;
}
export async function editChat({
  chatId,
  firstName,
  lastName,
}: EditChatParams) {
  const response = await axios.post(`${API_BASE_URL}/chats/${chatId}/rename`, {
    firstName,
    lastName,
  });
  return response.data;
}

export async function deleteChat(chatId: string) {
  const response = await axios.delete(`${API_BASE_URL}/chats/${chatId}`);
  return response.data;
}
