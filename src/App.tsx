import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
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
      completed: false,
    },
    {
      id: 5,
      text: "Pick up groceries",
      completed: false,
    },
    {
      id: 6,
      text: "Complete Todo App on Frontend Mentor",
      completed: false,
    },
  ]);

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  useEffect(() => {
    let bodyHasTheme = document.body.classList.contains("dark");

    if (theme === "dark" && !bodyHasTheme) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else if (theme === "light" && bodyHasTheme) {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const countUncompletedTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="relative h-full min-h-full w-full bg-veryDarkDesaturatedBlue font-josefinSans text-body font-normal">
      {/* Bg images for mobile */}
      <img
        src={
          theme === "light"
            ? "assets/bg-mobile-light.jpg"
            : "assets/bg-mobile-dark.jpg"
        }
        className="min-h-full min-w-full md:hidden"
        alt="Background image"
      />

      {/* Bg images for desktop */}
      <img
        src={
          theme === "light"
            ? "assets/bg-desktop-light.jpg"
            : "assets/bg-desktop-dark.jpg"
        }
        className="hidden min-h-full min-w-full md:block"
        alt="Background image"
      />

      <main className="absolute top-10 mx-auto flex min-h-full w-full flex-col items-center justify-center px-5 pb-10 md:top-20">
        <div className="w-full max-w-[600px]">
          <div className="mb-6 flex w-full items-center justify-between text-center">
            <h1 className="text-[40px] font-bold uppercase text-[#ffffff]">
              T O D O
            </h1>
            <button
              className="h-full"
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
            >
              {theme === "light" ? (
                <img src="assets/icon-moon.svg" alt="Moon icon" />
              ) : (
                <img src="assets/icon-sun.svg" alt="Sun icon" />
              )}
            </button>
          </div>

          <div className="flex w-full flex-col items-center gap-4">
            <Input setTodos={setTodos} />

            <div className="flex w-full flex-col items-center overflow-hidden rounded-md drop-shadow-lg">
              <Reorder.Group
                values={filteredTodos}
                onReorder={setTodos}
                as="ul"
                className="scrollbar flex w-full cursor-grab flex-col"
              >
                {filteredTodos.map((todo, index) => (
                  <Reorder.Item key={index} value={todo}>
                    <Todo todo={todo} setTodos={setTodos} />
                  </Reorder.Item>
                ))}
              </Reorder.Group>

              <div className="border-b-rounded flex w-full items-center justify-between bg-veryDarkDesaturatedBlue px-6 py-4 text-sm text-veryDarkGrayishBlue">
                <p className="font-medium">
                  {countUncompletedTodos} items left
                </p>
                <div className="flex items-center gap-6 font-bold">
                  <button
                    className={cn(
                      "transition-all duration-100 hover:text-veryLightGray",
                      filter === "all" && "text-brightBlue",
                    )}
                    onClick={() => setFilter("all")}
                  >
                    All
                  </button>
                  <button
                    className={cn(
                      "transition-all duration-100 hover:text-veryLightGray",
                      filter === "active" && "text-brightBlue",
                    )}
                    onClick={() => setFilter("active")}
                  >
                    Active
                  </button>
                  <button
                    className={cn(
                      "transition-all duration-100 hover:text-veryLightGray",
                      filter === "completed" && "text-brightBlue",
                    )}
                    onClick={() => setFilter("completed")}
                  >
                    Completed
                  </button>
                </div>
                <button
                  className="font-medium transition-all duration-100 hover:text-veryLightGray"
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

          <div className="border-b-rounded mt-4 w-full text-center text-sm text-veryDarkGrayishBlue">
            Drag and drop to reorder list
          </div>
        </div>
      </main>
    </div>
  );
}
