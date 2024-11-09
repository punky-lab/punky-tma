import ProgressBar from "./components/ProgressBar";
import HeartIcon from "@/assets/icons/v2/heart.svg";
import BatteryIcon from "@/assets/icons/v2/battery.svg";
import CoinIcon from "@/assets/icons/v2/coin.svg";

export default function PetInfo({ gameAccount }: { gameAccount: any }) {
  // 添加空值检查
  const { fitness = 0, happiness = 0, coins = 0, loyalty = 0 } = gameAccount || {};
  return (
    <div className="grid grid-cols-2 w-screen h-[95px] py-2 px-2.5 bg-no-repeat bg-[url('../assets/ui/top-bott-bar.svg')] bg-contain bg-top">
      <ProgressBar value={happiness / 10} Icon={HeartIcon} />
      <ProgressBar value={fitness / 10} Icon={BatteryIcon} />
      <ProgressBar value={loyalty / 10} Icon={CoinIcon} />
      {/* <div className="flex gap-4 items-center">
        <i className="nes-icon coin is-small"></i>
        <p className="mt-2"> {coins}</p>
      </div> */}
    </div>
  );
}
