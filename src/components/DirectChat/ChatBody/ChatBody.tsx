import ChatMessage from "../ChatMessage/ChatMessage";
import css from "./ChatBody.module.css";
const senderUser = true;

function ChatBody() {
  return (
    <ul className={css["message-container"]}>
      <li className={[css.message, senderUser ? css.user : ""].join(" ")}>
        <ChatMessage />
      </li>
      <li className={[css.message, senderUser ? css.user : ""].join(" ")}>
        <ChatMessage />
      </li>
      <li className={[css.message, senderUser ? css.user : ""].join(" ")}>
        <ChatMessage />
      </li>
      <li className={[css.message, senderUser ? css.user : ""].join(" ")}>
        <ChatMessage />
      </li>
    </ul>
  );
}

export default ChatBody;
