import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import css from "./App.module.css";
import DirectChat from "../DirectChat/DirectChat";
import Sidebar from "../Sidebar/Sidebar";
import fetchUser from "../service/fetchUser";
import Modal from "../Modal/Modal";
import ChatCreate from "../ChatCreate/ChatCreate";
import ChatEdit from "../ChatEdit/ChatEdit";
import Loader from "../Loader/Loader";
import { createChat, deleteChat, editChat } from "../service/submit";
import type { ModalContentType } from "../../types/modal";
import type { Chat } from "../../types/userInfo";

export default function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalContent, setModalContent] = useState<ModalContentType>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
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
    let storedId = localStorage.getItem("userId");
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("userId", storedId);
    }
    setUserId(storedId);
  }, []);
  useEffect(() => {
    if (!userId) return;

    async function fetch(id: string) {
      try {
        const data = await fetchUser(id);
        setChats(data.chats);
        if (!activeChat && data.chats.length > 0) {
          setActiveChat(data.chats[0]);
        }
      } catch (err) {
        toast.error("Sorry, error happened!");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetch(userId);
  }, [userId, activeChat]);

  useEffect(() => {
    if (!userId) return;
    async function fetch(id: string) {
      try {
        await fetchUser(id);
      } catch (err) {
        toast.error("Sorry, error happened!");
        console.log(err);
      }
    }

    fetch(userId);
  }, [chats, userId]);

  async function handleSubmit(data: { firstName: string; lastName: string }) {
    const { firstName, lastName } = data;
    if (!userId) return;
    try {
      if (modalContent === "create") {
        const response = await createChat(
          { userData: { firstName, lastName } },
          userId
        );
        setChats((prev) => [...prev, response]);
        toast.success(
          `You successfully created new chat with ${firstName} ${lastName}!`
        );
      } else if (modalContent === "edit" && activeChat) {
        await editChat({
          chatId: activeChat.chatId,
          firstName,
          lastName,
        });
        setChats((prev) =>
          prev.map((chat) =>
            chat.chatId === activeChat.chatId
              ? {
                  ...chat,
                  sender: { name: `${firstName} ${lastName}` },
                  messages: chat.messages,
                }
              : chat
          )
        );

        setActiveChat((prev) =>
          prev
            ? chats.find((chat) => chat.chatId === prev.chatId) || prev
            : prev
        );
        toast.success(`You successfully changed name!`);
      }
      closeModal();
    } catch (error) {
      toast.error("Sorry, error happened!");
      console.error("Error:", error);
    }
  }

  async function handleDeleteChat(chatId: string) {
    const confirmed = window.confirm(
      "Are you really want to delete this chat?"
    );
    if (!confirmed) return;
    try {
      await deleteChat(chatId);
      closeModal();
      setChats((prev) => prev.filter((chat) => chat.chatId !== chatId));

      if (!userId) return;
      const data = await fetchUser(userId);
      setActiveChat(data.chats[0] || null);
    } catch (error) {
      toast.error("Sorry, error happened!");
      console.error("Error deleting chat:", error);
    }
  }

  return (
    <div className={css.container}>
      {loading && <Loader />}
      <Sidebar
        userId={userId}
        onModal={openModal}
        chats={chats}
        setActiveChat={setActiveChat}
        setChats={setChats}
      />
      <DirectChat
        onModal={openModal}
        userId={userId}
        activeChat={activeChat}
        setChats={setChats}
      />
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
          )}
        </Modal>
      )}
      <Toaster position="top-right" />
    </div>
  );
}
