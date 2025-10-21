import ChatBody from "./ChatBody/ChatBody";
import ChatTypeMessage from "./ChatTypeMessage/ChatTypeMessage";
import ChatUser from "./ChatUser/ChatUser";
import css from "./DirectChat.module.css";

export default function DirectChat() {
  return (
    <div className={css["direct-chat-container"]}>
      <ChatUser />
      <ChatBody />
      <ChatTypeMessage />
    </div>
  );
}
