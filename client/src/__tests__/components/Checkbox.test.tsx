import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkbox from "@/components/Checkbox";
import { vi } from "vitest";

describe("Checkbox Component - Unit Tests", () => {
    it("should render checkbox button", () => {
        const mockSetCheckboxSelected = vi.fn();
        render(
            <Checkbox
                checkboxSelected={0}
                setCheckboxSelected={mockSetCheckboxSelected}
            />,
        );

        const checkboxElement = screen.getByTestId("checkbox-button");
        expect(checkboxElement).toBeInTheDocument();
    });

    it("should toggle checkboxSelected state on click", async () => {
        // When checkboxSelected is 0 (the checkbox is unchecked)
        // When checkboxSelected is 1 (the checkbox is checked) and a image with alt "check symbol" is rendered

        let checkboxSelected = 0;
        const mockSetCheckboxSelected = vi.fn((selected: number) => {
            checkboxSelected = selected;
        });

        const { rerender } = render(
            <Checkbox
                checkboxSelected={checkboxSelected}
                setCheckboxSelected={mockSetCheckboxSelected}
            />,
        );

        const checkboxElement = screen.getByTestId("checkbox-button");

        // Click to check the checkbox
        await userEvent.click(checkboxElement);
        rerender(
            <Checkbox
                checkboxSelected={checkboxSelected}
                setCheckboxSelected={mockSetCheckboxSelected}
            />,
        );
        expect(checkboxSelected).toBe(1);
        expect(mockSetCheckboxSelected).toHaveBeenCalledTimes(1);
        expect(screen.getByAltText(/check symbol/i)).toBeInTheDocument();

        // Click to uncheck the checkbox
        await userEvent.click(checkboxElement);
        rerender(
            <Checkbox
                checkboxSelected={checkboxSelected}
                setCheckboxSelected={mockSetCheckboxSelected}
            />,
        );
        expect(checkboxSelected).toBe(0);
        expect(mockSetCheckboxSelected).toHaveBeenCalledTimes(2);
        expect(screen.queryByAltText(/check symbol/i)).not.toBeInTheDocument();
    });
});
