export interface Message {
  messageId: string;
  senderOfMessage: "system" | "user";
  content: string;
  created: Date;
}

export interface Chat {
  chatId: string;
  chatDate: Date;
  avatar: string;
  sender: { name: string };
  messages: Message[];
}

export interface UserInfo {
  id: string;
  chats: Chat[];
}
