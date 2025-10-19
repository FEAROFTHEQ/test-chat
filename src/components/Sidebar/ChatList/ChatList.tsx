import ChatPreview from "../ChatPreview/ChatPreview";

export default function ChatList() {
  return (
    <>
      <h2>Chats</h2>
      <ul>
        <li>
          <ChatPreview />
        </li>
        <li>
          <ChatPreview />
        </li>
        <li>
          <ChatPreview />
        </li>
        <li>
          <ChatPreview />
        </li>
      </ul>
    </>
  );
}
