import Image from "next/image";
import React from "react";

type ProgressBarProps = {
  value: number; // 进度值（0-100）
  Icon: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ value, Icon }) => {
  return (
    <div className="flex items-center">
      <Image src={Icon} alt="" className="w-10 h-10" />
      <div className="relative w-36 h-6 bg-[#6e4e79] border-2 border-[#1b3b44] rounded-md overflow-hidden">
        <div
          style={{ width: `${value}%` }}
          className="h-full bg-[#ffffff]"
        ></div>
        {/* 外框的高光效果 */}
        <div className="absolute top-0 left-0 w-full h-full border border-[#20818f] rounded-md pointer-events-none"></div>
        {/* 进度值文字 */}
        <div className="absolute top-0 left-2 h-full flex items-center text-[#5b3b6e] text-[10px]">
          {Math.round(value)}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
