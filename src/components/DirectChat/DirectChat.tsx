import { useEffect, useState } from "react";
import type { ModalContentType } from "../../types/modal";
import ChatBody from "./ChatBody/ChatBody";
import ChatTypeMessage from "./ChatTypeMessage/ChatTypeMessage";
import ChatUser from "./ChatUser/ChatUser";
import css from "./DirectChat.module.css";
import fetchUser from "../service/fetchUser";
import type { Chat, Message, UserInfo } from "../../types/userInfo";

interface DirectChatProps {
  onModal: (type: ModalContentType) => void;
  userId: string | null;
  activeChat: Chat | null;
}

export default function DirectChat({
  onModal,
  userId,
  activeChat,
}: DirectChatProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userIdDirect, setUserIdDirect] = useState<string | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  useEffect(() => {
    if (!userId) return;
    async function fetch(id: string) {
      try {
        const data = await fetchUser(id);
        setUserInfo(data);
      } catch (err) {
        console.log(err);
      }
    }
    if (userId) {
      setUserIdDirect(userId);
      fetch(userId);
    }
  }, [userId]);
  useEffect(() => {
    if (activeChat) {
      setChat(activeChat);
    }
  }, [activeChat]);
  async function handleMessage(message: Message) {
    if (!chat) return;
    setChat({
      ...chat,
      messages: [...chat.messages, message],
    });
  }

  return (
    <div className={css["direct-chat-container"]}>
      {chat && (
        <>
          <ChatUser onModal={onModal} chat={chat} />
          <ChatBody chat={chat} />
          <ChatTypeMessage chat={chat} onNewMessage={handleMessage} />
        </>
      )}
    </div>
  );
}
