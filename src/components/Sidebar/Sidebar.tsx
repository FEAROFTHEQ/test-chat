import ChatHead from "./ChatHead/ChatHead";
import ChatList from "./ChatList/ChatList";
import css from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={css["container-sidebar"]}>
      <ChatHead />
      <ChatList />
    </div>
  );
}
