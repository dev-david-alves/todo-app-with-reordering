import { useState } from "react";
import Checkbox from "./Checkbox";

import { TodoType } from "../App";
import { cn } from "../utils/cn";

function Todo({
  todo,
  setTodos,
}: {
  todo: TodoType;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}) {
  const { id, text, completed } = todo;

  const handleRemoveTodo = (id: number) => {
    setTodos((prevTodos: TodoType[]) =>
      prevTodos.filter((todo) => todo.id !== id),
    );
  };

  const setCheckboxSelected = (selected: boolean) => {
    setTodos((prevTodos: TodoType[]) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: selected } : todo,
      ),
    );
  };

  return (
    <li className="flex w-full items-center justify-between border-b-[1px] border-veryDarkGrayishBlue bg-veryDarkDesaturatedBlue px-6 py-4">
      <div className="flex flex-1 items-center gap-6">
        <Checkbox
          checkboxSelected={completed}
          setCheckboxSelected={setCheckboxSelected}
        />
        <p
          className={cn(
            "text-lightGrayishBlueDark hover:text-lightGrayishBlueHover",
            completed && "text-veryDarkGrayishBlue line-through",
          )}
        >
          {text}
        </p>
      </div>

      <button
        className="hover:text-lightGrayishBlueDark focus:outline-none"
        onClick={() => handleRemoveTodo(id)}
      >
        <img src="./assets/icon-cross.svg" alt="Delete" />
      </button>
    </li>
  );
}

export default Todo;
