import React from "react";
import Image from "next/image";
import HandIcon from "@/assets/icons/v2/hand.svg";
import MicroIcon from "@/assets/icons/v2/micro.svg";
import GameIcon from "@/assets/icons/v2/game.svg";
import { authApis } from "@/app/normalApi";

export default function Action({ fetchUserData }: { fetchUserData: () => void }) {
  const handlePetTouch = async () => {
    try {
      const response = await authApis.touchPet();
      fetchUserData()
      console.log('摸宠物成功：', response.data);
    } catch (error) {
      console.error('摸宠物失败：', error);
    }
  };

  return (
    <div className="flex mb-2 w-full items-center justify-center space-x-8">
      <div
        className="w-12 h-12 flex items-center justify-center bg-[url(../assets/icons/button-round.svg)] bg-contain bg-center z-50 cursor-pointer"
        onClick={handlePetTouch}
      >
        <Image src={HandIcon} alt="Hand" className="w-10 h-10" />
      </div>

      <div className="w-12 h-12 flex items-center justify-center bg-[url(../assets/icons/button-round.svg)] bg-contain bg-center z-50">
        <Image src={MicroIcon} alt="Micro" className="w-10 h-10" />
      </div>

      <div className="w-12 h-12 flex items-center justify-center bg-[url(../assets/icons/button-round.svg)] bg-contain bg-center z-50">
        <Image src={GameIcon} alt="Game" className="w-10 h-10" />
      </div>
    </div>
  );
}
