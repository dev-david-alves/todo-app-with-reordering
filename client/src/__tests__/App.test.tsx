import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";
import axios from "axios";
import { vi } from "vitest";

describe("App Component - Unit Tests", () => {
    const sampleTodos = [
        { id: 1, title: "Test Todo 1", completed: 0 },
        { id: 2, title: "Test Todo 2", completed: 1 },
    ];

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("should render App component correctly", async () => {
        // Render with mocked todos
        vi.spyOn(axios, "get").mockResolvedValue({ data: sampleTodos });
        render(<App />);

        // Toggle Theme Button
        const toggleThemeButton = screen.getByTestId("toggle-theme-button");
        expect(toggleThemeButton).toBeInTheDocument();
        expect(document.body.classList.contains("dark")).toBe(true);

        // Input Component
        const inputElement = screen.getByPlaceholderText(/new todo/i);
        expect(inputElement).toBeInTheDocument();

        // Todo Components
        const todoItems = await screen.findAllByRole("listitem");
        expect(todoItems).toHaveLength(sampleTodos.length);

        // Uncompleted Todos Count
        expect(await screen.findByText(/1 items left/i)).toBeInTheDocument();

        // Filters Buttons
        const allFilter = screen.getByText(/^all$/i);
        const activeFilter = screen.getByText(/^active$/i);
        const completedFilter = screen.getByText(/^completed$/i);
        expect(allFilter).toBeInTheDocument();
        expect(activeFilter).toBeInTheDocument();
        expect(completedFilter).toBeInTheDocument();

        // Clear Completed Button
        const clearCompletedButton = screen.getByText(/clear completed/i);
        expect(clearCompletedButton).toBeInTheDocument();
    });

    it("should toggle theme on button click", async () => {
        render(<App />);
        const toggleThemeButton = screen.getByTestId("toggle-theme-button");
        await userEvent.click(toggleThemeButton);
        expect(document.body.classList.contains("light")).toBe(true);
        await userEvent.click(toggleThemeButton);
        expect(document.body.classList.contains("dark")).toBe(true);
    });

    it("should filter todos based on selected filter", async () => {
        // Render with mocked todos
        vi.spyOn(axios, "get").mockResolvedValue({ data: sampleTodos });
        render(<App />);

        // Click on Active filter
        const activeFilter = screen.getByText(/^active$/i);
        await userEvent.click(activeFilter);
        let todoItems = await screen.findAllByRole("listitem");
        expect(todoItems).toHaveLength(1);
        expect(todoItems[0]).toHaveTextContent("Test Todo 1");

        // Click on Completed filter
        const completedFilter = screen.getByText(/^completed$/i);
        await userEvent.click(completedFilter);
        todoItems = await screen.findAllByRole("listitem");
        expect(todoItems).toHaveLength(1);
        expect(todoItems[0]).toHaveTextContent("Test Todo 2");

        // Click on All filter
        const allFilter = screen.getByText(/^all$/i);
        await userEvent.click(allFilter);
        todoItems = await screen.findAllByRole("listitem");
        expect(todoItems).toHaveLength(2);
    });
});

describe("App Component - Integration Tests", () => {
    const sampleTodos = [
        { id: 1, title: "Test Todo 1", completed: 0 },
        { id: 2, title: "Test Todo 2", completed: 1 },
    ];

    it("should delete all completed todos when 'Clear Completed' is clicked", async () => {
        // Mock GET and DELETE requests
        vi.spyOn(axios, "get").mockResolvedValue({ data: sampleTodos });
        const deleteSpy = vi.spyOn(axios, "delete").mockResolvedValue({});

        render(<App />);

        // Click on Clear Completed button
        const clearCompletedButton = screen.getByText(/clear completed/i);
        await userEvent.click(clearCompletedButton);

        // Assert DELETE requests were called with correct URLs
        expect(deleteSpy).toHaveBeenCalledWith("http://localhost:3001/todos");
        expect(deleteSpy).toHaveBeenCalledTimes(1);
    });
});
