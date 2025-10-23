import Button from "../Button/Button";
import css from "./ChatCreate.module.css";
interface ChatCreateProps {
  onSubmit: (data: { firstName: string; lastName: string }) => void;
}

export default function ChatCreate({ onSubmit }: ChatCreateProps) {
  return (
    <form
      className={css.form}
      action={(formData) => {
        const firstName = formData.get("first-name") as string;
        const lastName = formData.get("last-name") as string;
        const trimmedFirst = firstName.trim();
        const trimmedLast = lastName.trim();
        if (!trimmedFirst || !trimmedLast) return;
        console.log("submit");
        onSubmit({ firstName: trimmedFirst, lastName: trimmedLast });
      }}
    >
      <input
        className={css.input}
        type="text"
        name="first-name"
        placeholder="First Name"
        required
      />
      <input
        className={css.input}
        type="text"
        name="last-name"
        placeholder="Last Name"
        required
      />
      <Button text="Create Chat" className={css.button} type="submit" />
    </form>
  );
}
