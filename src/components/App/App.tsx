import DirectChat from "../DirectChat/DirectChat";
import Sidebar from "../Sidebar/Sidebar";
import css from "./App.module.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import fetchUser from "../service/fetchUser";
import Modal from "../Modal/Modal";
import type { ModalContentType } from "../../types/modal";
import ChatCreate from "../ChatCreate/ChatCreate";
import { createChat, deleteChat, editChat } from "../service/submit";
import type { Chat } from "../../types/userInfo";
import ChatEdit from "../ChatEdit/ChatEdit";

function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContentType>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const openModal = (type: ModalContentType) => {
    setModalContent(type);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    let storedId = localStorage.getItem("userId");
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("userId", storedId);
    }
    setUserId(storedId);

    async function fetch(id: string) {
      try {
        const data = await fetchUser(id);
        if (!activeChat && data.chats.length > 0) {
          setActiveChat(data.chats[0]);
        }
        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    if (userId) {
      fetch(userId);
    }
  }, [userId]);

  useEffect(() => {
    console.log("CHATS EFFECT");
    if (!userId) return;

    async function fetch(id: string) {
      try {
        await fetchUser(id);
      } catch (err) {
        console.log(err);
      }
    }

    fetch(userId);
  }, [chats]);

  async function handleSubmit(data: { firstName: string; lastName: string }) {
    const { firstName, lastName } = data;
    if (!userId) return;
    try {
      if (modalContent === "create") {
        const response = await createChat(
          { userData: { firstName, lastName } },
          userId
        );
        const newChat: Chat = {
          chatId: "",
          chatDate: new Date(),
          avatar: "",
          sender: { name: `${firstName} ${lastName}` },
          messages: [],
        };
        setChats((prev) => [...prev, newChat]);
        console.log("firs name:", firstName, "| last name:", lastName);
        console.log(response);
      } else if (modalContent === "edit" && activeChat) {
        const response = await editChat({
          chatId: activeChat.chatId,
          firstName,
          lastName,
        });
        setChats((prev) => [...prev, response]);

        setActiveChat((prev) =>
          prev && prev.chatId === activeChat.chatId
            ? { ...prev, sender: { name: `${firstName} ${lastName}` } }
            : prev
        );
      }
      closeModal();
      // додати повідомлення про успіх
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleDeleteChat(chatId: string) {
    const confirmed = window.confirm(
      "Are you really want to delete this chat?"
    );
    if (!confirmed) return;
    try {
      const response = await deleteChat(chatId);
      closeModal();
      setChats((prev) => [...prev, response]);
      if (!userId) return;
      const data = await fetchUser(userId);
      setActiveChat(data.chats[0] || null);
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  }

  return (
    <div className={css.container}>
      {loading && <p>Loading...</p>}
      <Sidebar
        userId={userId}
        onModal={openModal}
        chats={chats}
        setActiveChat={setActiveChat}
      />
      <DirectChat onModal={openModal} userId={userId} activeChat={activeChat} />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {modalContent === "create" && <ChatCreate onSubmit={handleSubmit} />}
          {modalContent === "edit" && activeChat && (
            <ChatEdit
              chatId={activeChat.chatId}
              onClose={closeModal}
              onSubmit={handleSubmit}
              defaultName={activeChat.sender.name}
              onDelete={handleDeleteChat}
            />
            // <ChatEdit
            //   onClose={closeModal}
            //   onSubmit={handleSubmit}
            //   defaultName={activeChat?.sender.name || ""}
            //   onDelete={handleDeleteChat}
            //   chatId={activeChat && activeChat.chatId}
            // />
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
