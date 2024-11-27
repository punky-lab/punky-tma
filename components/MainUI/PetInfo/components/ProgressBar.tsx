import Image from "next/image";
import React from "react";

type ProgressBarProps = {
  value: number;
  Icon: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ value, Icon }) => {
  const filledBlocks = Math.round(value / 10);

  return (
    <div className="flex items-center gap-1">
      <Image src={Icon} alt="" className="w-10 h-10" />
      <div className="relative flex gap-[2px] h-6 bg-[#6e4e79] p-1 border-2 border-[#1b3b44] rounded-md">
        <div className="absolute -right-9 top-1/2 -translate-y-1/2 text-[#ffffff] text-[10px] whitespace-nowrap">
          {`${Math.round(value)}%`}
        </div>
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className={`
              w-2 h-full 
              border-2 
              ${
                index < filledBlocks
                  ? "bg-white border-[#20818f]"
                  : "bg-transparent border-[#4a3653]"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
