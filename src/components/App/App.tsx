import DirectChat from "../DirectChat/DirectChat";
import Sidebar from "../Sidebar/Sidebar";
import css from "./App.module.css";

function App() {
  return (
    <div className={css.container}>
      <Sidebar />
      <DirectChat />
    </div>
  );
}

export default App;
