import ChatPreview from "../ChatPreview/ChatPreview";
import css from "./ChatList.module.css";

export default function ChatList() {
  return (
    <div>
      <h2 className={css.title}>Chats</h2>
      <ul className={css.list}>
        <li className={css["list-item"]}>
          <ChatPreview />
        </li>
        <li className={css["list-item"]}>
          <ChatPreview />
        </li>
        <li className={css["list-item"]}>
          <ChatPreview />
        </li>
      </ul>
    </div>
  );
}
