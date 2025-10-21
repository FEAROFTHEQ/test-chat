import avatar from "../../../public/avatars/avatar-1.jpg";
import css from "./ChatUser.module.css";

export default function ChatUser() {
  return (
    <div className={css["user-container"]}>
      <img src={avatar} alt="Profile" className={css["chat-user-image"]} />
      <p>Name Name</p>
    </div>
  );
}
