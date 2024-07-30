import { useState } from "react";
import Checkbox from "./Checkbox";
import { TodoType } from "../App";

function Input({
  setTodos,
}: {
  setTodos: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [checkboxSelected, setCheckboxSelected] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSetTodos = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTodos((prevTodos: TodoType[]) => [
        ...prevTodos,
        {
          id: prevTodos.length + 1,
          text: inputValue,
          completed: checkboxSelected,
        },
      ]);
      setInputValue("");
      setCheckboxSelected(false);
    }
  };

  return (
    <div className="flex w-full items-center gap-6 rounded-md bg-veryDarkDesaturatedBlue px-6 py-4">
      <Checkbox
        checkboxSelected={checkboxSelected}
        setCheckboxSelected={setCheckboxSelected}
      />
      <input
        type="text"
        value={inputValue}
        placeholder="Create a new todo..."
        className="foucs:outline-none border-none bg-veryDarkDesaturatedBlue text-darkGrayishBlue outline-none ring-0"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => handleSetTodos(e)}
      />
    </div>
  );
}

export default Input;
