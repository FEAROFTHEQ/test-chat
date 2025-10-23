import avatar from "../../../public/avatars/avatar-1.jpg";
import type { ModalContentType } from "../../../types/modal";
import Button from "../../Button/Button";
import css from "./ChatUser.module.css";

interface ChatUserProps {
  onModal: (type: ModalContentType) => void;
}

export default function ChatUser({ onModal }: ChatUserProps) {
  return (
    <div className={css["user-container"]}>
      <img src={avatar} alt="Profile" className={css["chat-user-image"]} />
      <p className={css.name}>Name Name</p>
      <Button
        text="Edit"
        className={css.button}
        handleClick={() => onModal("edit")}
      />
    </div>
  );
}
