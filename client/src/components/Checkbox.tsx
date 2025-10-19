import React from "react";
import { cn } from "@/utils/cn";
import IconCheck from "@/assets/icon-check.svg";

function Checkbox({
  checkboxSelected,
  setCheckboxSelected,
}: {
  checkboxSelected: number;
  setCheckboxSelected:
    | React.Dispatch<React.SetStateAction<number>>
    | ((selected: number) => void);
}) {
  return (
    <button
      className={cn(
        "flex h-6 min-h-6 w-6 min-w-6 items-center justify-center rounded-full border-[1px] border-veryDarkGrayishBlueDark transition-all hover:border-checkBackgroundLeft hover:border-opacity-50",
        checkboxSelected &&
          "bg-gradient-to-r from-checkBackgroundLeft to-checkBackgroundRight",
      )}
      onClick={() => setCheckboxSelected(checkboxSelected ? 0 : 1)}
    >
      {checkboxSelected == 1 && <img src={IconCheck} alt="Check" />}
    </button>
  );
}

export default Checkbox;
