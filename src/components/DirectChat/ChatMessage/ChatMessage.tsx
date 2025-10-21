import avatar from "../../../public/avatars/avatar-1.jpg";
import css from "./ChatMessage.module.css";
const senderUser = true;

export default function ChatMessage() {
  return (
    <>
      <div className={css["message-img"]}>
        <img
          src={avatar}
          alt="Profile"
          className={[
            css["chat-message-picture"],
            senderUser ? css.user : "",
          ].join(" ")}
        />
        <p
          className={[
            css["message-text"],
            senderUser ? css["user-text"] : "",
          ].join(" ")}
        >
          Message Text
        </p>
      </div>
      <p className={css.date}>Date</p>
    </>
  );
}
