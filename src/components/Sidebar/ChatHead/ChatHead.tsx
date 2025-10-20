import UserLogin from "../UserLogin/UserLogin";
import css from "./ChatHead.module.css";
import search from "../../../public/icons/search.svg";

export default function ChatHead() {
  return (
    <div className={css["container-head"]}>
      <UserLogin />
      <input type="text" placeholder="Placeholder" className={css.input} />
      <img src={search} alt="" className={css.search} />
    </div>
  );
}
