import React, { useEffect, useState } from "react";

interface Props {
  className?: string;
}

const ThinkingBubble = ({ className }: Props) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return "";
        }
        return prevDots + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`absolute top-[10%] left-[calc(30%+10px)] transform -translate-x-1/2 -translate-y-full ${className}`}
    >
      <div className="bg-pink-100 rounded-full p-2 shadow-md">
        <span className="text-pink-800 font-bold text-lg">{dots}</span>
      </div>
      <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-solid border-pink-100 border-b-0 absolute left-1/2 transform -translate-x-1/2"></div>
    </div>
  );
};

export default ThinkingBubble;
