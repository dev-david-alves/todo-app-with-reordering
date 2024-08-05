import React from "react";
import { cn } from "../utils/cn";

function Checkbox({
  checkboxSelected,
  setCheckboxSelected,
}: {
  checkboxSelected: boolean;
  setCheckboxSelected:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((selected: boolean) => void);
}) {
  return (
    <button
      className={cn(
        "flex h-6 min-h-6 w-6 min-w-6 items-center justify-center rounded-full border-[1px] border-veryDarkGrayishBlueDark transition-all hover:border-checkBackgroundLeft hover:border-opacity-50",
        checkboxSelected &&
          "bg-gradient-to-r from-checkBackgroundLeft to-checkBackgroundRight",
      )}
      onClick={() => setCheckboxSelected(!checkboxSelected)}
    >
      {checkboxSelected && <img src="./assets/icon-check.svg" alt="Check" />}
    </button>
  );
}

export default Checkbox;
