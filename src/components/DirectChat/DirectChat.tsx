import type { ModalContentType } from "../../types/modal";
import ChatBody from "./ChatBody/ChatBody";
import ChatTypeMessage from "./ChatTypeMessage/ChatTypeMessage";
import ChatUser from "./ChatUser/ChatUser";
import css from "./DirectChat.module.css";

interface DirectChatProps {
  onModal: (type: ModalContentType) => void;
}

export default function DirectChat({ onModal }: DirectChatProps) {
  return (
    <div className={css["direct-chat-container"]}>
      <ChatUser onModal={onModal} />
      <ChatBody />
      <ChatTypeMessage />
    </div>
  );
}
