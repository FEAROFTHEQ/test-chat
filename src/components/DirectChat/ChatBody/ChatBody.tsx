import { useEffect, useRef } from "react";
import type { Chat } from "../../../types/userInfo";
import ChatMessage from "../ChatMessage/ChatMessage";
import css from "./ChatBody.module.css";
interface ChatBodyProps {
  chat: Chat;
}

export default function ChatBody({ chat }: ChatBodyProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chat.messages]);
  const messages = chat.messages || [];
  return (
    <ul className={css["message-container"]} ref={containerRef}>
      {messages.map((message) => {
        const isUser = message.senderOfMessage === "user";
        const messageClasses = [
          css.message,
          isUser ? css.user : css.system,
        ].join(" ");

        return (
          <li key={message.messageId} className={messageClasses}>
            <ChatMessage message={message} avatar={chat.avatar} />
          </li>
        );
      })}
    </ul>
  );
}
