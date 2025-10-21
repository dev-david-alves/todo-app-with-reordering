import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "@/components/Input.tsx";
import axios from "axios";
import { vi } from "vitest";

describe("Input Component - Unit Tests", () => {
    it("should render input and checkbox", () => {
        const mockSetTodos = vi.fn();

        render(<Input setTodos={mockSetTodos} />);

        const inputElement = screen.getByPlaceholderText(/new todo/i);
        expect(inputElement).toBeInTheDocument();

        const checkboxElement = screen.getByTestId("checkbox-button");
        expect(checkboxElement).toBeInTheDocument();
    });

    it("should update input value on change", async () => {
        const mockSetTodos = vi.fn();
        render(<Input setTodos={mockSetTodos} />);

        const inputElement = screen.getByPlaceholderText(/new todo/i);
        await userEvent.type(inputElement, "Test Todo");

        expect((inputElement as HTMLInputElement).value).toBe("Test Todo");
    });
});

describe("Input Component - Integration Tests", () => {
    const mockSetTodos = vi.fn();

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("should call setTodos on Enter key press with valid input", async () => {
        vi.spyOn(axios, "post").mockResolvedValue({ data: { id: 1 } });
        render(<Input setTodos={mockSetTodos} />);

        const inputElement = screen.getByPlaceholderText(/new todo/i);
        await userEvent.type(inputElement, "Test Todo{Enter}");
        expect(axios.post).toHaveBeenCalledWith("http://localhost:3001/todos", {
            title: "Test Todo",
            completed: 0,
        });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(mockSetTodos).toHaveBeenCalledTimes(1);
    });

    it("should not call setTodos on Enter key press with empty input", async () => {
        vi.spyOn(axios, "post").mockResolvedValue({ data: { id: 1 } });
        render(<Input setTodos={mockSetTodos} />);

        const inputElement = screen.getByPlaceholderText(/new todo/i);
        await userEvent.type(inputElement, "{Enter}");

        expect(axios.post).not.toHaveBeenCalled();
        expect(mockSetTodos).not.toHaveBeenCalled();
    });
});
