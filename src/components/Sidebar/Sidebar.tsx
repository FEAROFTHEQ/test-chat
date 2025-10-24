import { useEffect, useState } from "react";
import ChatHead from "./ChatHead/ChatHead";
import ChatList from "./ChatList/ChatList";
import css from "./Sidebar.module.css";
import type { Chat, UserInfo } from "../../types/userInfo.ts";
import fetchUser from "../service/fetchUser.ts";
import type { ModalContentType } from "../../types/modal.ts";

interface SidebarProps {
  userId: string | null;
  onModal: (type: ModalContentType) => void;
  chats: Chat[];
  setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>;
  setChats: (data: Chat[]) => void;
}

export default function Sidebar({
  userId,
  onModal,
  chats,
  setActiveChat,
  setChats,
}: SidebarProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [search, setSearch] = useState("");
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  useEffect(() => {
    if (!userId) return;
    async function fetch(id: string) {
      try {
        const data = await fetchUser(id);
        setUserInfo(data);
        setChats(data.chats);
      } catch (err) {
        console.log(err);
      }
    }
    if (userId) {
      fetch(userId);
    }
  }, [userId, setChats]);
  useEffect(() => {
    async function fetch(id: string) {
      try {
        const data = await fetchUser(id);
        setUserInfo(data);
      } catch (err) {
        console.log(err);
      }
    }
    if (userId) {
      fetch(userId);
    }
  }, [chats, userId]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredChats(chats);
      return;
    }

    const filtered = chats.filter((chat) =>
      chat.sender.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredChats(filtered);
  }, [search, chats]);

  return (
    <div className={css["container-sidebar"]}>
      <ChatHead setSearch={setSearch} />
      {userInfo && (
        <ChatList
          userData={{ ...userInfo, chats: filteredChats }}
          onModal={onModal}
          setActiveChat={setActiveChat}
        />
      )}
    </div>
  );
}
