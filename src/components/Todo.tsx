import { TodoType } from "@/App";
import { cn } from "@/utils/cn";
import Checkbox from "@/components/Checkbox";
import IconCross from "@/assets/icon-cross.svg";

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
          {text}
        </p>
      </div>

      <button
        className="text-lightGrayishBlueDark invisible transition-all duration-100 focus:outline-none group-hover/todo:visible p-2"
        onClick={() => handleRemoveTodo(id)}
      >
        <img src={IconCross} alt="Delete" />
      </button>
    </div>
  );
}

export default Todo;
