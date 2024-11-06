import Image from "next/image";
import InfoIcon from "@/assets/icons/v2/info.svg"
import ShopIcon from "@/assets/icons/v2/shop.svg"
import BallIcon from "@/assets/icons/v2/ball.svg"
import RankIcon from "@/assets/icons/v2/rank.svg"
import PersonIcon from "@/assets/icons/v2/personal.svg"

export default function NavBar() {
    return (
        // <div className="relative flex items-center justify-around w-full h-20 bg-[url('../assets/icons/v2/border.svg')] bg-contain bg-center bg-no-repeat p-4">
        <div className="flex items-center justify-around w-full h-20 bg-[#473a5a] border-2 border-[#1b3b44] rounded-lg p-4 bg-[length:100%_4px] bg-[linear-gradient(#7e5c9b_50%,transparent_50%)]">

            {/* 信息图标按钮 */}
            <div className="flex items-center justify-center w-12 h-12 bg-[rgba(126,92,155,0.5)] border-2 border-[#3a91a0] rounded-md">
                <Image src={InfoIcon} alt="Info Icon" className="w-10 h-10" />
            </div>

            {/* 商店图标按钮 */}
            <div className="flex items-center justify-center w-12 h-12 bg-[rgba(126,92,155,0.5)] border-2 border-[#3a91a0] rounded-md">
                <Image src={ShopIcon} alt="Shop Icon" className="w-10 h-10" />
            </div>

            {/* 球图标按钮 */}
            <div className="flex items-center justify-center w-12 h-12 bg-[rgba(126,92,155,0.5)] border-2 border-[#3a91a0] rounded-md">
                <Image src={BallIcon} alt="Ball Icon" className="w-10 h-10" />
            </div>

            {/* 排名图标按钮 */}
            <div className="flex items-center justify-center w-12 h-12 bg-[rgba(126,92,155,0.5)] border-2 border-[#3a91a0] rounded-md">
                <Image src={RankIcon} alt="Rank Icon" className="w-10 h-10" />
            </div>

            {/* 个人图标按钮 */}
            <div className="flex items-center justify-center w-12 h-12 bg-[rgba(126,92,155,0.5)] border-2 border-[#3a91a0] rounded-md">
                <Image src={PersonIcon} alt="Person Icon" className="w-10 h-10" />
            </div>
        </div>
    );
};