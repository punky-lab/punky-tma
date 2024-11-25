import React from "react";
import Image from "next/image";
import HandIcon from "@/assets/icons/v2/hand.svg";
import MicroIcon from "@/assets/icons/v2/micro.svg";
import GameIcon from "@/assets/icons/v2/game.svg";
import { authApis } from "@/app/normalApi";
import { useRouter } from "next/navigation";

export default function Action({
  fetchUserData,
  setIsPetting,
}: {
  fetchUserData: () => void;
  setIsPetting: (isPetting: boolean) => void;
}) {
  const handlePetTouch = async () => {
    try {
      setIsPetting(true);
      const response = await authApis.touchPet();
      fetchUserData();
      setIsPetting(false);
      console.log("touch pet success", response.data);
    } catch (error) {
      console.error("touch pet error", error);
    }
  };

  const router = useRouter();

  return (
    <div className="relative h-32 w-full mb-6">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="w-12 h-12 flex items-center justify-center bg-[url(../assets/icons/button-round.svg)] bg-contain bg-center z-50 cursor-pointer"
          onClick={handlePetTouch}
        >
          <Image src={HandIcon} alt="Hand" className="w-10 h-10" />
        </div>
      </div>

      <div className="absolute left-1/3 top-[60%] -translate-x-1/2">
        <div className="w-12 h-12 flex items-center justify-center bg-[url(../assets/icons/button-round.svg)] bg-contain bg-center z-50">
          <Image src={MicroIcon} alt="Micro" className="w-10 h-10" />
        </div>
      </div>

      <div className="absolute left-2/3 top-[60%] -translate-x-1/2">
        <div
          className="w-12 h-12 flex items-center justify-center bg-[url(../assets/icons/button-round.svg)] bg-contain bg-center z-50"
          onClick={() => {
            router.push("https://runner-game.punky.app");
          }}
        >
          <Image src={GameIcon} alt="Game" className="w-10 h-10" />
        </div>
      </div>
    </div>
  );
}
