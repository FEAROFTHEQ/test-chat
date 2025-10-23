import { useEffect, useState } from "react";
import ChatHead from "./ChatHead/ChatHead";
import ChatList from "./ChatList/ChatList";
import css from "./Sidebar.module.css";
import type { UserInfo } from "../../types/userInfo.ts";
import fetchUser from "../service/fetchUser.ts";
import type { ModalContentType } from "../../types/modal.ts";

interface SidebarProps {
  userId: string | null;
  onModal: (type: ModalContentType) => void;
}

export default function Sidebar({ userId, onModal }: SidebarProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
    if (!userId) return;
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
  }, [userId]);
  return (
    <div className={css["container-sidebar"]}>
      <ChatHead />
      {userInfo && <ChatList userData={userInfo} onModal={onModal} />}
    </div>
  );
}
