import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todo from "@/components/Todo";
import axios from "axios";
import { vi } from "vitest";

describe("Todo Component - Unit Tests", () => {
    it("should render todo title, checkbox, and delete button", () => {
        const sampleTodo = { id: 1, title: "Sample Todo", completed: 0 };
        const mockSetTodos = vi.fn();

        render(<Todo todo={sampleTodo} setTodos={mockSetTodos} />);
        expect(screen.getByText("Sample Todo")).toBeInTheDocument();
        expect(screen.getByTestId("checkbox-button")).toBeInTheDocument();
        expect(screen.getByTestId("delete-button")).toBeInTheDocument();
    });
});

describe("Todo Component - Integration Tests", () => {
    const sampleTodo = { id: 1, title: "Sample Todo", completed: 0 };
    const mockSetTodos = vi.fn();

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("should update todo completed status on checkbox click", async () => {
        vi.spyOn(axios, "put").mockResolvedValue({});
        render(<Todo todo={sampleTodo} setTodos={mockSetTodos} />);
        const checkbox = screen.getByTestId("checkbox-button");
        // Click to mark as completed
        await userEvent.click(checkbox);
        expect(axios.put).toHaveBeenCalledWith(
            `http://localhost:3001/todos/1`,
            { completed: 1 },
        );
        // Click to mark as not completed
        await userEvent.click(checkbox);
        expect(axios.put).toHaveBeenCalledWith(
            `http://localhost:3001/todos/1`,
            { completed: 0 },
        );
    });

    it("should delete todo on delete button click", async () => {
        vi.spyOn(axios, "delete").mockResolvedValue({});
        render(<Todo todo={sampleTodo} setTodos={mockSetTodos} />);
        const deleteButton = screen.getByTestId("delete-button");
        await userEvent.click(deleteButton);
        expect(axios.delete).toHaveBeenCalledWith(
            `http://localhost:3001/todos/1`,
        );
    });
});
