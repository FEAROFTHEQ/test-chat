import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import type { ModalContentType } from "../../types/modal";
import ChatBody from "./ChatBody/ChatBody";
import ChatTypeMessage from "./ChatTypeMessage/ChatTypeMessage";
import ChatUser from "./ChatUser/ChatUser";
import css from "./DirectChat.module.css";
import fetchUser from "../service/fetchUser";
import type { Chat, Message } from "../../types/userInfo";
import { fetchRandomQuote } from "../service/getQuote";
import sendMessage from "../service/sendMessage";
import type { NewMessagePayload } from "../../types/message";

interface DirectChatProps {
  onModal: (type: ModalContentType) => void;
  userId: string | null;
  activeChat: Chat | null;
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}

export default function DirectChat({
  onModal,
  userId,
  activeChat,
  setChats,
}: DirectChatProps) {
  // const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  // const [userIdDirect, setUserIdDirect] = useState<string | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  useEffect(() => {
    if (!userId) return;
    async function fetch(id: string) {
      try {
        await fetchUser(id);
      } catch (err) {
        console.log(err);
      }
    }
    if (userId) {
      fetch(userId);
    }
  }, [userId]);
  useEffect(() => {
    if (activeChat) {
      setChat(activeChat);
    }
  }, [activeChat]);
  async function handleMessage(message: Message, targetChatId: string) {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.chatId === targetChatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
    setChat((prevChat) =>
      prevChat && prevChat.chatId === targetChatId
        ? { ...prevChat, messages: [...prevChat.messages, message] }
        : prevChat
    );

    setTimeout(async () => {
      try {
        const quote = await fetchRandomQuote();
        const systemMessage: Message = {
          messageId: uuidv4(),
          senderOfMessage: "system",
          content: quote,
          created: new Date(),
        };
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.chatId === targetChatId
              ? { ...chat, messages: [...chat.messages, systemMessage] }
              : chat
          )
        );
        setChat((prevChat) =>
          prevChat && prevChat.chatId === targetChatId
            ? { ...prevChat, messages: [...prevChat.messages, systemMessage] }
            : prevChat
        );

        await sendMessage(targetChatId, quote, "system");

        const maxLength = 50;
        const displayQuote =
          quote.length > maxLength ? quote.slice(0, maxLength) + "…" : quote;
        toast.success(`You have new message: "${displayQuote}"`);
      } catch (err) {
        console.error(err);
      }
    }, 3000);
  }

  return (
    <div className={css["direct-chat-container"]}>
      {chat && (
        <>
          <ChatUser onModal={onModal} chat={chat} />
          <ChatBody chat={chat} />
          <ChatTypeMessage
            chat={chat}
            onNewMessage={({ message, targetChatId }: NewMessagePayload) =>
              handleMessage(message, targetChatId)
            }
          />
        </>
      )}
      <Toaster position="top-right" />
    </div>
  );
}
