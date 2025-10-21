import Button from "../../Button/Button";
import css from "./ChatTypeMessage.module.css";
import send from "../../../public/icons/send.svg";

export default function ChatTypeMessage() {
  return (
    <form className={css["type-container"]}>
      <input
        type="text"
        className={css.message}
        placeholder="Type your message..."
        name="message"
      />
      <Button text="" className={css.send}>
        <img src={send} className={css["send-icon"]} />
      </Button>
    </form>
  );
}
