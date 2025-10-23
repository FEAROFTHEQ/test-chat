import axios from "axios";
import { API_BASE_URL } from "./api.ts";

interface createChatData {
  userData: { firstName: string; lastName: string };
}

export async function createChat(
  userData: createChatData,
  userId: string
): Promise<createChatData> {
  const response = await axios.post<createChatData>(
    `${API_BASE_URL}/create/${userId}`,
    userData
  );
  return response.data;
}
export async function editChat() {}
