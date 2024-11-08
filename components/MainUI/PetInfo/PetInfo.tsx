import ProgressBar from "./components/ProgressBar";
import HeartIcon from "@/assets/icons/v2/heart.svg";
import BatteryIcon from "@/assets/icons/v2/battery.svg";
import CoinIcon from "@/assets/icons/v2/coin.svg";

export default function PetInfo() {
  return (
      <div className="grid grid-cols-2 w-screen h-[95px] py-2 px-2.5 bg-no-repeat bg-[url('../assets/ui/top-bott-bar.svg')] bg-contain bg-top">
        <ProgressBar value={70} Icon={HeartIcon} />
        <ProgressBar value={50} Icon={BatteryIcon} />
        <ProgressBar value={30} Icon={CoinIcon} />
      </div>
  );
}
