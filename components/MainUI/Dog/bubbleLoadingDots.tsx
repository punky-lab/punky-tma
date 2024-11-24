import React from "react";

const BubbleLoadingDots: React.FC = () => {
  return (
    <div className="flex justify-start items-center space-x-2">
      <div className="w-3 h-3 bg-orange-300 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-orange-300 rounded-full animate-bounce delay-200"></div>
      <div className="w-3 h-3 bg-orange-300 rounded-full animate-bounce delay-400"></div>
    </div>
  );
};

export default BubbleLoadingDots;
