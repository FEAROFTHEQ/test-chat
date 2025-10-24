import { useDebouncedCallback } from "use-debounce";
import UserLogin from "../UserLogin/UserLogin";
import css from "./ChatHead.module.css";
import search from "../../../public/icons/search.svg";
import { useState } from "react";
interface ChatHeadProps {
  setSearch: (query: string) => void;
}

export default function ChatHead({ setSearch }: ChatHeadProps) {
  const [searchInput, setSearchInput] = useState("");
  const debounced = useDebouncedCallback((query: string) => {
    setSearch(query);
    console.log("Search query:", query);
  }, 300);
  return (
    <div className={css["container-head"]}>
      <UserLogin />
      <input
        type="text"
        placeholder="Search by name"
        className={css.input}
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          debounced(e.target.value);
        }}
        name="query"
      />
      <img src={search} alt="" className={css.search} />
    </div>
  );
}
