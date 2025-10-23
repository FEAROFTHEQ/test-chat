import type { ModalContentType } from "../../../types/modal";
import type { Chat, UserInfo } from "../../../types/userInfo";
import Button from "../../Button/Button";
import ChatPreview from "../ChatPreview/ChatPreview";
import css from "./ChatList.module.css";

interface ChatListProps {
  userData: UserInfo;
  onModal: (type: ModalContentType) => void;
  setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>;
}

export default function ChatList({
  userData,
  onModal,
  setActiveChat,
}: ChatListProps) {
  const { chats } = userData;
  return (
    <div>
      <h2 className={css.title}>Chats</h2>
      <Button
        className={css.create}
        text="Create chat"
        handleClick={() => onModal("create")}
      />
      <ul className={css.list}>
        {chats.map((chat) => {
          return (
            <li
              className={css["list-item"]}
              key={chat.chatId}
              onClick={() => setActiveChat(chat)}
            >
              <ChatPreview
                date={chat.chatDate}
                sender={chat.sender}
                messages={chat.messages}
                avatar={chat.avatar}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
