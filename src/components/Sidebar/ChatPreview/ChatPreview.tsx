import css from "./ChatPreview.module.css";
// import avatar from "../../../public/avatars/avatar-1.jpg";
import type { Message } from "../../../types/userInfo";

interface ChatPreviewProps {
  date: Date;
  messages: Message[];
  sender: { name: string };
  avatar: string;
}

export default function ChatPreview({
  date,
  messages,
  sender,
  avatar,
}: ChatPreviewProps) {
  const lastMessage =
    messages && messages.length > 0 ? messages[messages.length - 1] : null;
  const API_URL = import.meta.env.VITE_API_URL;
  return (
    <>
      <div className={css["chat-info"]}>
        <img
          src={`${API_URL}${avatar}`}
          alt="Profile"
          className={css["chat-image"]}
        />
        <div>
          <p className={css["first-name"]}>{sender && sender.name}</p>
          <p className={css["last-message"]}>
            {lastMessage ? lastMessage.content : null}
          </p>
        </div>
      </div>
      <p className={css["chat-date"]}>
        {new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </>
  );
}
