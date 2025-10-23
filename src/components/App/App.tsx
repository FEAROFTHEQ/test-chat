import DirectChat from "../DirectChat/DirectChat";
import Sidebar from "../Sidebar/Sidebar";
import css from "./App.module.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import fetchUser from "../service/fetchUser";
import Modal from "../Modal/Modal";
import type { ModalContentType } from "../../types/modal";
import ChatCreate from "../ChatCreate/ChatCreate";
import { createChat, editChat } from "../service/submit";
import type { Chat } from "../../types/userInfo";
import ChatEdit from "../ChatEdit/ChatEdit";

function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContentType>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chats, setChats] = useState<Array<object>>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
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

  async function handleSubmit(formData: FormData) {
    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    if (!userId) return;
    try {
      if (modalContent === "create") {
        const response = await createChat(
          { userData: { firstName, lastName } },
          userId
        );
        setChats((prev) => [...prev, response]);
        console.log("firs name:", firstName, "| last name:", lastName);
        console.log(response);
      } else if (modalContent === "edit") {
        await editChat({ firstName, lastName });
      }
      closeModal();
      // додати повідомлення про успіх
    } catch (error) {
      console.error("Error:", error);
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
          {modalContent === "edit" && (
            <ChatEdit onSuccess={closeModal} onSubmit={handleSubmit} />
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
