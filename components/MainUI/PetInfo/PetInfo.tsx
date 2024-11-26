import ProgressBar from "./components/ProgressBar";
import HeartIcon from "@/assets/icons/v2/heart.svg";
import BatteryIcon from "@/assets/icons/v2/battery.svg";
import CoinIcon from "@/assets/icons/v2/coin.svg";
import Image from "next/image";
import { useEffect } from "react";

export default function PetInfo({ gameAccount }: { gameAccount: any }) {
  // 添加空值检查
  const {
    fitness = 0,
    happiness = 0,
    balance = 0,
    loyalty = 0,
  } = gameAccount || {};
  useEffect(() => {
    console.log("gameAccount", gameAccount);
  }, [gameAccount]);
  return (
    <div className="grid grid-cols-2 w-screen h-[95px] py-2 px-2.5 bg-no-repeat bg-[url('../assets/ui/top-bott-bar.svg')] bg-contain bg-top">
      <ProgressBar value={happiness / 10} Icon={HeartIcon} />
      <div className="flex items-center">
        <Image src={CoinIcon} alt="Coin" className="w-10 h-10" />
        <p className="text-white text-xs">{loyalty / 10} coins</p>
      </div>
      <ProgressBar value={fitness / 10} Icon={BatteryIcon} />
      {/* <ProgressBar value={loyalty / 10} Icon={CoinIcon} /> */}
    </div>
  );
}
