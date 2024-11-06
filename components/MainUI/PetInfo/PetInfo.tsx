import Image from "next/image"
import ProgressBar from "./components/ProgressBar"
import HeartIcon from '@/assets/icons/v2/heart.svg'; // 替换为实际图标路径
import BatteryIcon from '@/assets/icons/v2/battery.svg';
import CoinIcon from '@/assets/icons/v2/coin.svg';

export default function PetInfo() {
    return (
        <div className="grid grid-cols-2 w-full h-20 bg-[#473a5a] border-2 border-[#1b3b44] rounded-lg bg-[length:100%_4px] bg-[linear-gradient(#7e5c9b_50%,transparent_50%)]">
            <ProgressBar value={70} Icon={HeartIcon} />
            <ProgressBar value={50} Icon={BatteryIcon} />
            <ProgressBar value={30} Icon={CoinIcon} />
        </div>
    )
}