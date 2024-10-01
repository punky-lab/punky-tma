import React, { useEffect, useState } from "react";

const LoadingAnimation: React.FC<{ text?: string }> = ({ text = "思考中" }) => {
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
    <div className="flex items-center space-x-2">
      <span className="text-white font-pixel text-lg">{`${text}${dots}`}</span>
    </div>
  );
};

export default LoadingAnimation;
