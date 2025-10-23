import DirectChat from "../DirectChat/DirectChat";
import Sidebar from "../Sidebar/Sidebar";
import css from "./App.module.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import fetchUser from "../service/fetchUser";
import Modal from "../Modal/Modal";
import type { ModalContentType } from "../../types/modal";
import ChatCreate from "../ChatCreate/ChatCreate";

function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContentType>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <div className={css.container}>
      {loading && <p>Loading...</p>}
      <Sidebar userId={userId} onModal={openModal} />
      <DirectChat onModal={openModal} />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {modalContent === "create" && <ChatCreate />}
          {/* {modalType === "edit" && <ChatEditForm onSuccess={closeModal} />} */}
        </Modal>
      )}
    </div>
  );
}

export default App;
