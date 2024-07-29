import { useState } from "react";

const ChoiceButton = ({ prop }: { prop: string }): JSX.Element => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <button
      className={`px-2 py-1 text-sm rounded-lg border
        ${
          isSelected
            ? "text-white bg-blue-500 hover:bg-blue-400"
            : "text-black border-neutral-300 hover:bg-neutral-100"
        }`}
      onClick={() => setIsSelected(!isSelected)}
    >
      <div>{prop}</div>
    </button>
  );
};

export default ChoiceButton;
