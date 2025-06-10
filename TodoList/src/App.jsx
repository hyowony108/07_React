import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoList from "./components/TodoList.jsx";

function App() {
  const [count, setCount] = useState(true);

  return (
    <>
      <TodoList />
    </>
  );
}

export default App;
