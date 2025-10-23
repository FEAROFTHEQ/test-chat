import Button from "../Button/Button";
import css from "./ChatCreate.module.css";
interface ChatCreateProps {
  onSubmit: (formData: FormData) => void;
}

export default function ChatCreate({ onSubmit }: ChatCreateProps) {
  return (
    <form
      className={css.form}
      action={(formData) => {
        console.log("submit");
        onSubmit(formData);
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
