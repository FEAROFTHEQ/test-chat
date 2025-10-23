import Button from "../../Button/Button";
import css from "./ChatTypeMessage.module.css";
import send from "../../../public/icons/send.svg";
import type { Chat, Message } from "../../../types/userInfo";
import { useState } from "react";
import sendMessage from "../../service/sendMessage";
interface ChatTypeMessageProps {
  chat: Chat;
  onNewMessage: (message: Message) => void;
}

export default function ChatTypeMessage({
  chat,
  onNewMessage,
}: ChatTypeMessageProps) {
  const [message, setMessage] = useState("");
  async function handleSubmit(formData: FormData) {
    const content = formData.get("message") as string;
    try {
      const newMessage = await sendMessage(chat.chatId, content.trim());
      onNewMessage(newMessage);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  }
  return (
    <form className={css["type-container"]} action={handleSubmit}>
      <input
        type="text"
        className={css.message}
        placeholder="Type your message..."
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button text="" className={css.send} type="submit">
        <img src={send} className={css["send-icon"]} alt="Send" />
      </Button>
    </form>
  );
}
