import css from "./ChatPreview.module.css";
import avatar from "../../../public/avatars/avatar-1.jpg";

export default function ChatPreview() {
  return (
    <>
      <div className={css["chat-info"]}>
        <img src={avatar} alt="Profile" className={css["chat-image"]} />
        <div>
          <p className={css["first-name"]}>Name Name</p>
          <p className={css["last-message"]}>Last message</p>
        </div>
      </div>
      <p className={css["chat-date"]}>Date</p>
    </>
  );
}
