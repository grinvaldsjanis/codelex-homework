import React, { useState } from "react";
import Todo from "./todo";
import TodoForm from "./todo-form";


export type TodoType = {
  id: number;
  text: string;
  isComplete?: boolean;
};

function TodoList() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = (todo: TodoType) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    setTodos([todo, ...todos]);
  };

  const updateTodo = (todoId: number, newValue: TodoType) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id: number) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const completeTodo = (id: number) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>What's teh plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;
