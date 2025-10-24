import { useEffect, useState } from "react";
import Button from "../Button/Button";
import css from "./ChatEdit.module.css";

interface ChatEditProps {
  onSubmit: (data: { firstName: string; lastName: string }) => void;
  onDelete: (chatId: string) => void;
  defaultName: string;
  onClose: () => void;
  chatId: string;
}

export default function ChatEdit({
  onSubmit,
  onDelete,
  defaultName,
  onClose,
  chatId,
}: ChatEditProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    const parts = defaultName.trim().split(" ");
    setFirstName(parts[0] || "");
    setLastName(parts.slice(1).join(" ") || "");
  }, [defaultName]);
  function handleSubmit() {
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    if (!trimmedFirst || !trimmedLast) return;
    onSubmit({ firstName: trimmedFirst, lastName: trimmedLast });
    onClose();
  }

  return (
    <form className={css.form} action={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="first-name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        className={css.input}
        type="text"
        name="last-name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <div className={css.buttons}>
        <Button text="Save" type="submit" className={css.button} />
        <Button
          text="Delete"
          type="button"
          handleClick={() => onDelete(chatId)}
          className={css.button}
        />
      </div>
    </form>
  );
}
