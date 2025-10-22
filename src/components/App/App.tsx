import DirectChat from "../DirectChat/DirectChat";
import Sidebar from "../Sidebar/Sidebar";
import css from "./App.module.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import fetchUser from "../service/fetchUser";
import Modal from "../Modal/Modal";

function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setLoading(true);
    let storedId = localStorage.getItem("userId");
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("userId", storedId);
    }
    setUserId(storedId);
    console.log(userId);

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
      <Sidebar />
      <DirectChat />
      <button onClick={openModal}>Open modal</button>
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
}

export default App;
