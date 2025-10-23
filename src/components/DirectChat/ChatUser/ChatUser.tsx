import type { ModalContentType } from "../../../types/modal";
import type { Chat } from "../../../types/userInfo";
import Button from "../../Button/Button";
import css from "./ChatUser.module.css";

interface ChatUserProps {
  onModal: (type: ModalContentType) => void;
  chat: Chat | null;
}

export default function ChatUser({ onModal, chat }: ChatUserProps) {
  const API_URL = import.meta.env.VITE_API_URL;
  return (
    <div className={css["user-container"]}>
      {chat && (
        <>
          <img
            src={`${API_URL}${chat.avatar}`}
            alt="Profile"
            className={css["chat-user-image"]}
          />
          <p className={css.name}>{chat.sender.name}</p>
          <Button
            text="Edit"
            className={css.button}
            handleClick={() => onModal("edit")}
          />
        </>
      )}
    </div>
  );
}
