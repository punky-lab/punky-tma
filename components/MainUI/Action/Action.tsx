import React from "react";
import Image from "next/image";
import HandIcon from "@/assets/icons/v2/hand.svg";
import MicroIcon from "@/assets/icons/v2/micro.svg";
import GameIcon from "@/assets/icons/v2/game.svg";

export default function Action() {
  return (
    <div className="flex mb-4 w-full items-center justify-center space-x-8">
      <div className="w-12 h-12 flex items-center justify-center border-2 border-[#62cadc] rounded-full">
        <Image src={HandIcon} alt="Hand" className="w-10 h-10" />
      </div>

      <div className="w-12 h-12 flex items-center justify-center border-2 border-[#62cadc] rounded-full">
        <Image src={MicroIcon} alt="Micro" className="w-10 h-10" />
      </div>

      <div className="w-12 h-12 flex items-center justify-center border-2 border-[#62cadc] rounded-full">
        <Image src={GameIcon} alt="Game" className="w-10 h-10" />
      </div>
    </div>
  );
}
