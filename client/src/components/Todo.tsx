import { TodoType } from "@/App";
import { cn } from "@/utils/cn";
import Checkbox from "@/components/Checkbox";
import IconCross from "@/assets/icon-cross.svg";
import axios from "axios";

function Todo({
  todo,
  setTodos,
}: {
  todo: TodoType;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}) {
  const { id, title, completed } = todo;

  const handleRemoveTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      setTodos((prevTodos: TodoType[]) =>
        prevTodos.filter((todo) => todo.id !== id),
      );
    } catch (error) {
      alert("Error removing todo!");
    }
  };

  const setCheckboxSelected = async (selected: number) => {
    try {
      await axios.put(`http://localhost:3001/todos/${id}`, {
        completed: selected,
      });

      setTodos((prevTodos: TodoType[]) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: selected } : todo,
        ),
      );
    } catch (error) {
      alert("Error updating todo!");
    }
  };

  return (
    <div className="group/todo flex w-full items-center justify-between border-b-[1px] border-veryDarkGrayishBlue bg-veryDarkDesaturatedBlue px-6 py-4">
      <div className="flex flex-1 items-center gap-6">
        <Checkbox
          checkboxSelected={completed}
          setCheckboxSelected={setCheckboxSelected}
        />
        <p
          className={cn(
            "text-veryLightGrayishBlue hover:text-veryLightGray",
            completed &&
              "text-veryDarkGrayishBlue line-through hover:text-veryDarkGrayishBlue",
          )}
        >
          {title}
        </p>
      </div>

      <button
        className="text-lightGrayishBlueDark invisible p-2 transition-all duration-100 focus:outline-none group-hover/todo:visible"
        onClick={() => handleRemoveTodo(id)}
      >
        <img src={IconCross} alt="Delete" />
      </button>
    </div>
  );
}

export default Todo;
