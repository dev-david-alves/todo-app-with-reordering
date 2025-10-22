import { useState } from "react";
import axios from "axios";
import Checkbox from "@/components/Checkbox";
import IconCross from "@/assets/icon-cross.svg";
import { cn } from "@/utils/cn";
import { TodoType } from "@/App";

function Todo({
    todo,
    setTodos,
}: {
    todo: TodoType;
    setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}) {
    const { id, title } = todo;
    const [completed, setCompleted] = useState(todo.completed);

    const handleDeleteTodo = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3001/todos/${id}`);
            setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
        } catch {
            alert("Error removing todo!");
        }
    };

    const handleUpdateTodo = async (selected: number) => {
        try {
            setCompleted(selected);
            await axios.put(`http://localhost:3001/todos/${id}`, {
                completed: selected,
            });

            setTodos((prevTodos) =>
                prevTodos.map((t) =>
                    t.id === id ? { ...t, completed: selected } : t,
                ),
            );
        } catch {
            alert("Error updating todo!");
        }
    };

    return (
        <div className="group/todo flex w-full items-center justify-between border-b-[1px] border-veryDarkGrayishBlue bg-veryDarkDesaturatedBlue px-6 py-4">
            <div className="flex flex-1 items-center gap-2">
                <Checkbox
                    checkboxSelected={completed}
                    setCheckboxSelected={handleUpdateTodo}
                />
                <p
                    className={cn(
                        "text-veryLightGrayishBlue hover:text-veryLightGray",
                        completed &&
                            "text-sm text-veryDarkGrayishBlue line-through hover:text-veryDarkGrayishBlue",
                    )}
                >
                    {title}
                </p>
            </div>

            <button
                data-testid="delete-button"
                className="text-lightGrayishBlueDark p-2 transition-all duration-100 focus:outline-none"
                onClick={() => handleDeleteTodo(id)}
            >
                <img
                    src={IconCross}
                    alt="Delete"
                    className="size-3 transition-all duration-100"
                />
            </button>
        </div>
    );
}

export default Todo;
