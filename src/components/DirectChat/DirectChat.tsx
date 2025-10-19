import ChatBody from "../ChatBody/ChatBody";
import ChatTypeMessage from "../ChatTypeMessage/ChatTypeMessage";
import ChatUser from "../ChatUser/ChatUser";

export default function DirectChat() {
  return (
    <div>
      <ChatUser />
      <ChatBody />
      <ChatTypeMessage />
    </div>
  );
}
