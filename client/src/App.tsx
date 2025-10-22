import { useEffect, useState } from "react";
import Input from "@/components/Input";
import Todo from "@/components/Todo";
import axios from "axios";
import { Reorder } from "framer-motion";
import { cn } from "@/utils/cn";
import SunIcon from "@/assets/icon-sun.svg";
import MoonIcon from "@/assets/icon-moon.svg";

export type TodoType = {
    id: number;
    title: string;
    completed: number;
};

export default function App() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    const filteredTodos = todos.filter((todo) => {
        if (filter === "all") return true;
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    const handleClearCompletedTodos = async () => {
        try {
            await axios.delete("http://localhost:3001/todos");
            setTodos((prevTodos) =>
                prevTodos.filter((todo) => !todo.completed),
            );
        } catch (error) {
            alert("Error clearing completed todos!");
        }
    };

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const { data } = await axios.get<TodoType[]>(
                    "http://localhost:3001/todos",
                );
                setTodos(data);
            } catch (error) {
                alert("Error fetching todos!");
            }
        };

        fetchTodos();
    }, []);

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

    const countUncompletedTodos = todos.filter(
        (todo) => !todo.completed,
    ).length;

    return (
        <main className="flex min-h-dvh w-full flex-col items-center justify-center px-5 py-6">
            <div className="w-full max-w-[600px]">
                <div className="mb-6 flex w-full items-center justify-between text-center">
                    <h1 className="text-2xl font-bold text-veryLightGrayishBlue sm:text-3xl">
                        Simple Todo
                    </h1>
                    <button
                        data-testid="toggle-theme-button"
                        className="h-full"
                        onClick={() => {
                            setTheme(theme === "light" ? "dark" : "light");
                        }}
                    >
                        {theme === "light" ? (
                            <img
                                src={MoonIcon}
                                alt="Moon icon"
                                className="size-5 transition-all duration-300 sm:size-6"
                            />
                        ) : (
                            <img
                                src={SunIcon}
                                alt="Sun icon"
                                className="size-5 transition-all duration-300 sm:size-6"
                            />
                        )}
                    </button>
                </div>

                <div className="flex w-full flex-col items-center gap-4">
                    <Input setTodos={setTodos} />

                    <div className="flex w-full flex-col items-center overflow-hidden rounded-md drop-shadow-lg">
                        <div className="flex w-full items-center justify-between border-b-[1px] border-veryDarkGrayishBlue bg-veryDarkDesaturatedBlue px-6 py-4 text-sm text-veryDarkGrayishBlue">
                            <p className="min-w-fit font-medium">
                                {countUncompletedTodos} items left
                            </p>
                            <button
                                className="min-w-fit font-medium transition-all duration-100 hover:text-veryLightGray"
                                onClick={handleClearCompletedTodos}
                            >
                                Clear Completed
                            </button>
                        </div>

                        <Reorder.Group
                            values={filteredTodos}
                            onReorder={setTodos}
                            className="scrollbar flex w-full cursor-grab flex-col"
                        >
                            {filteredTodos.map((todo) => (
                                <Reorder.Item key={todo.id} value={todo}>
                                    <Todo todo={todo} setTodos={setTodos} />
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>

                        <div className="flex w-full items-center justify-center gap-4 bg-veryDarkDesaturatedBlue px-6 py-4 text-sm text-veryDarkGrayishBlue">
                            <button
                                className={cn(
                                    "min-w-fit transition-all duration-100 hover:text-veryLightGray",
                                    filter === "all" && "text-brightBlue",
                                )}
                                onClick={() => setFilter("all")}
                            >
                                All
                            </button>
                            <button
                                className={cn(
                                    "min-w-fit transition-all duration-100 hover:text-veryLightGray",
                                    filter === "active" && "text-brightBlue",
                                )}
                                onClick={() => setFilter("active")}
                            >
                                Active
                            </button>
                            <button
                                className={cn(
                                    "min-w-fit transition-all duration-100 hover:text-veryLightGray",
                                    filter === "completed" && "text-brightBlue",
                                )}
                                onClick={() => setFilter("completed")}
                            >
                                Completed
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-b-rounded mt-4 w-full text-center text-sm text-veryDarkGrayishBlue">
                    Drag and drop to reorder the list
                </div>
            </div>
        </main>
    );
}
