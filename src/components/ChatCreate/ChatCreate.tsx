import Button from "../Button/Button";
import css from "./ChatCreate.module.css";

export default function ChatCreate() {
  return (
    <form
      className={css.form}
      action={() => {
        console.log("submit");
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
