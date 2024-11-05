import Image from "next/image"
import ProgressBar from "./components/ProgressBar"
import HeartIcon from '@/assets/icons/v2/heart.svg'; // 替换为实际图标路径
import BatteryIcon from '@/assets/icons/v2/battery.svg';
import CoinIcon from '@/assets/icons/v2/coin.svg';

export default function PetInfo() {
    return (
        <div className="grid grid-cols-2 p-5 bg-[url('../assets/icons/v2/border.svg')] bg-contain bg-center bg-no-repeat">
            <ProgressBar value={70} Icon={HeartIcon} />
            <ProgressBar value={50} Icon={BatteryIcon} />
            <ProgressBar value={30} Icon={CoinIcon} />
        </div>
    )
}