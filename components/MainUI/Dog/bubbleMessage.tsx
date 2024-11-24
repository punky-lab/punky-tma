import React from "react";

interface BubbleMessageProps {
  message: string;
}

const BubbleMessage: React.FC<BubbleMessageProps> = ({ message }) => {
  return (
    <div
      className="
        relative
        bg-orange-300
        p-4
        text-gray-800
        rounded-lg
        border-2
        border-orange-400
        shadow-[4px_4px_0px_0px_rgba(251,146,60,0.7)]
        before:content-['']
        before:absolute
        before:left-4
        before:bottom-[-8px]
        before:w-4
        before:h-4
        before:bg-orange-300
        before:rotate-45
        before:border-b-2
        before:border-r-2
        before:border-orange-400
      "
    >
      {message}
    </div>
  );
};

export default BubbleMessage;
