import React, { useState } from "react";
import TodoForm from "./todo-form";
import { TodoType } from "./todo-list";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

type TodoProps = {
todos: TodoType[];
completeTodo: (id: number) => void;
removeTodo: (id: number) => void;
updateTodo: (todoId: number, newValue: TodoType) => void;
};

const Todo: React.FC<TodoProps> = ({ todos, completeTodo, removeTodo }) => {
  const [edit, setEdit] = useState<{ id: number | null; value: string }>({
    id: null,
    value: "",
  });

  return (
    <>
      {todos.map((todo, index) => (
        <div
          className={todo.isComplete ? "todo-row complete" : "todo-row"}
          key={todo.id}
        >
          <div onClick={() => completeTodo(todo.id)}>{todo.text}</div>
          <div className="icons">
            <RiCloseCircleLine
              onClick={() => removeTodo(todo.id)}
              className="delete-icon"
            />

            <TiEdit
              onClick={() => setEdit({ id: todo.id, value: todo.text })}
              className="edit-icon"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Todo;
