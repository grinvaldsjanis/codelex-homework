import { useState } from "react";
import "./App.css";
import TodoForm from "./components/todo-form";
import TodoList from "./components/todo-list";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
