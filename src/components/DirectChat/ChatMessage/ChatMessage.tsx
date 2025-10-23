import type { Message } from "../../../types/userInfo";
import css from "./ChatMessage.module.css";
interface ChatMessageProps {
  message: Message;
  avatar: string;
}

export default function ChatMessage({ message, avatar }: ChatMessageProps) {
  const API_URL = import.meta.env.VITE_API_URL;
  const sender = message.senderOfMessage === "user" ? "user" : "system";
  return (
    <>
      <div className={css["message-img"]}>
        <img
          src={`${API_URL}${avatar}`}
          alt="Profile"
          className={[css["chat-message-picture"], css[`${sender}-img`]].join(
            " "
          )}
        />
        <p className={[css["message-text"], css[`${sender}-text`]].join(" ")}>
          {message.content}
        </p>
      </div>
      <p className={css.date}>
        {new Date(message.created).toLocaleTimeString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </>
  );
}
