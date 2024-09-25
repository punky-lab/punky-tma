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
      {/* <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div> */}
      <span className="text-white font-mono text-lg">{`${text}${dots}`}</span>
    </div>
  );
};

export default LoadingAnimation;
