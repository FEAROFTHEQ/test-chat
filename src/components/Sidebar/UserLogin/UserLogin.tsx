import Button from "../../Button/Button";
import css from "./UserLogin.module.css";
import user from "../../../public/avatars/user.jpg";

export default function UserLogin() {
  return (
    <div>
      <img src={user} alt="Profile picture" className={css["user-avatar"]} />
      <Button text="Log In" className={css.button} />
    </div>
  );
}
