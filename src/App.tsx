import { useEffect, useState } from "react";
import Input from "./components/Input";
import Todo from "./components/Todo";
import { cn } from "./utils/cn";

export type TodoType = {
  id: number;
  text: string;
  completed: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<TodoType[]>([
    {
      id: 1,
      text: "Complete online JavaScript course",
      completed: true,
    },
    {
      id: 2,
      text: "Jog around the park 3x",
      completed: false,
    },
    {
      id: 3,
      text: "10 minutes meditation",
      completed: false,
    },
    {
      id: 4,
      text: "Read for 1 hour",
      completed: true,
    },
    {
      id: 5,
      text: "Pick up groceries",
      completed: false,
    },
    {
      id: 6,
      text: "Complete Todo App on Frontend Mentor",
      completed: true,
    },
  ]);

  const [filter, setFilter] = useState<string>("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const countUncompletedTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="relative min-h-full font-josefinSans text-body font-normal">
      <img
        src="./assets/bg-desktop-dark.jpg"
        className="min-h-full min-w-full object-cover"
        alt="Dark background"
      />

      <main className="absolute top-20 mx-auto flex min-h-full w-full flex-col items-center justify-center px-10 pb-10">
        <div className="w-full max-w-[600px]">
          <div className="mb-8 flex w-full items-start justify-between text-center">
            <h1 className="text-[40px] font-bold uppercase text-white">
              T O D O
            </h1>
            <button className="h-full">
              <img src="./assets/icon-sun.svg" alt="Sun icon" />
            </button>
          </div>

          <div className="flex w-full flex-col items-center gap-4">
            <Input setTodos={setTodos} />

            <div className="flex w-full flex-col items-center overflow-hidden rounded-md">
              <div className="scrollbar flex w-full flex-col">
                {filteredTodos.map((todo) => (
                  <Todo key={todo.id} todo={todo} setTodos={setTodos} />
                ))}
              </div>

              <div className="border-b-rounded flex w-full items-center justify-between bg-veryDarkDesaturatedBlue px-6 py-4 text-sm text-veryDarkGrayishBlue">
                <p className="">{countUncompletedTodos} items left</p>
                <div className="flex items-center gap-6 font-bold">
                  <button
                    className={cn(
                      "transition-all duration-100 hover:text-white",
                      filter === "all" && "text-brightBlue",
                    )}
                    onClick={() => setFilter("all")}
                  >
                    All
                  </button>
                  <button
                    className={cn(
                      "transition-all duration-100 hover:text-white",
                      filter === "active" && "text-brightBlue",
                    )}
                    onClick={() => setFilter("active")}
                  >
                    Active
                  </button>
                  <button
                    className={cn(
                      "transition-all duration-100 hover:text-white",
                      filter === "completed" && "text-brightBlue",
                    )}
                    onClick={() => setFilter("completed")}
                  >
                    Completed
                  </button>
                </div>
                <button
                  className="transition-all duration-100 hover:text-white"
                  onClick={() =>
                    setTodos((prevTodos) =>
                      prevTodos.filter((todo) => !todo.completed),
                    )
                  }
                >
                  Clear Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
