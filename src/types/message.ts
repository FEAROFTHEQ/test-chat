import type { Message } from "./userInfo";

export interface NewMessagePayload {
  message: Message;
  targetChatId: string;
}
