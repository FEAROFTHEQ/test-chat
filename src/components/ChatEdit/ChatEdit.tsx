import Button from "../Button/Button";
import css from "./ChatEdit.module.css";

interface ChatEditProps {
  onSubmit: (formData: FormData) => void;
  onDelete: () => void;
  defaultName: string;
}

export default function ChatEdit({
  onSubmit,
  onDelete,
  defaultName,
}: ChatEditProps) {
  return (
    <form
      className={css.form}
      action={(formData) => {
        onSubmit(formData);
      }}
    >
      <input
        className={css.input}
        type="text"
        name="chat-name"
        placeholder="Chat Name"
        defaultValue={defaultName}
        required
      />
      <div className={css.buttons}>
        <Button text="Save" type="submit" className={css.button} />
        <Button
          text="Delete"
          type="button"
          handleClick={onDelete}
          className={css.button}
        />
      </div>
    </form>
  );
}
