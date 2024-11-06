import { useState } from "react";

import Image from "next/image";
import ChatIcon from "@/assets/icons/v2/chat.svg"
import ShopIcon from "@/assets/icons/v2/shop.svg"
import BallIcon from "@/assets/icons/v2/ball.svg"
import InfoIcon from "@/assets/icons/v2/info.svg"
import PersonIcon from "@/assets/icons/v2/personal.svg"
import ChatPage from "@/components/MainUI/SlideUI/ChatPage"
import InfoPage from "@/components/MainUI/SlideUI/InfoPage"
import ShopPage from "@/components/MainUI/SlideUI/ShopPage"
import UserPage from "@/components/MainUI/SlideUI/UserPage"

export default function NavBar() {
    const [currentPage, setCurrentPage] = useState<string | null>(null)

    const renderPage = () => {
        switch (currentPage) {
            case "chat": return <ChatPage/>;
            case "shop": return <ShopPage/>;
            case "info": return <InfoPage/>;
            case "user": return <UserPage/>;
            default: return null;
        }
    }

    return (
        // <div className="relative flex items-center justify-around w-full h-20 bg-[url('../assets/icons/v2/border.svg')] bg-contain bg-center bg-no-repeat p-4">
        <div className="flex items-center justify-around w-full h-20 bg-[#3a3b5a] border-4 border-[#1b3b44] rounded-lg p-4 bg-[length:100%_4px] bg-[linear-gradient(#7e5c9b_50%,transparent_50%)]">

            {/* 聊天图标按钮 */}
            <div onClick={() => setCurrentPage("chat")} className="flex items-center justify-center w-12 h-12 bg-[#7e5c9b] border-2 border-[#3a91a0] rounded-md">
                <Image src={ChatIcon} alt="Chat Icon" className="w-6 h-6" />
            </div>

            {/* 商店图标按钮 */}
            <div onClick={() => setCurrentPage("shop")} className="flex items-center justify-center w-12 h-12 bg-[#7e5c9b] border-2 border-[#3a91a0] rounded-md">
                <Image src={ShopIcon} alt="Shop Icon" className="w-6 h-6" />
            </div>

            {/* 球图标按钮 */}
            <div className="flex items-center justify-center w-12 h-12 bg-[#7e5c9b] border-2 border-[#3a91a0] rounded-md">
                <Image src={BallIcon} alt="Ball Icon" className="w-6 h-6" />
            </div>

            {/* 信息图标按钮 */}
            <div onClick={() => setCurrentPage("info")} className="flex items-center justify-center w-12 h-12 bg-[#7e5c9b] border-2 border-[#3a91a0] rounded-md">
                <Image src={InfoIcon} alt="Info Icon" className="w-6 h-6" />
            </div>

            {/* 个人图标按钮 */}
            <div onClick={() => setCurrentPage("user")} className="flex items-center justify-center w-12 h-12 bg-[#7e5c9b] border-2 border-[#3a91a0] rounded-md">
                <Image src={PersonIcon} alt="Person Icon" className="w-6 h-6" />
            </div>
            {renderPage()}
        </div>
    );
};