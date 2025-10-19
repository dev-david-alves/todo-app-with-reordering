import { useState } from "react";
import Checkbox from "@/components/Checkbox";
import { TodoType } from "@/App";
import axios from "axios";

function Input({
  setTodos,
}: {
  setTodos: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [checkboxSelected, setCheckboxSelected] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleSetTodos = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      try {
        const { data } = await axios.post("http://localhost:3001/todos", {
          title: inputValue,
          completed: checkboxSelected ? 1 : 0,
        });

        setTodos((prevTodos: TodoType[]) => [
          ...prevTodos,
          {
            id: data.id,
            title: inputValue,
            completed: checkboxSelected,
          },
        ]);
        setInputValue("");
        setCheckboxSelected(0);
      } catch (error) {
        alert("Error adding todo!");
      }
    }
  };

  return (
    <div className="flex w-full items-center gap-6 rounded-md bg-veryDarkDesaturatedBlue px-6 py-4 drop-shadow-lg">
      <Checkbox
        checkboxSelected={checkboxSelected}
        setCheckboxSelected={setCheckboxSelected}
      />
      <input
        type="text"
        value={inputValue}
        placeholder="Create a new todo..."
        className="foucs:outline-none w-full border-none bg-veryDarkDesaturatedBlue text-veryLightGrayishBlue outline-none ring-0 placeholder:text-darkGrayishBlue"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => handleSetTodos(e)}
      />
    </div>
  );
}

export default Input;
