import { useRef, useEffect } from "react";
import Image from "next/image";
import ChatIcon from "@/assets/icons/v2/chat.svg"
import ShopIcon from "@/assets/icons/v2/shop.svg"
import BallIcon from "@/assets/icons/v2/ball.svg"
import InfoIcon from "@/assets/icons/v2/info.svg"
import PersonIcon from "@/assets/icons/v2/personal.svg"

import { useNavHeight } from "@/components/Root/navHeightContext"

interface NavBarProps {
    onPageChange: (page: string | null) => void;
}

export default function NavBar({ onPageChange }: NavBarProps) {
    const { setNavHeight } = useNavHeight();
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const nav = navRef.current;
        const updateHeight = () => {
            if (nav) {
                setNavHeight(nav.offsetHeight);
            }
        };
        
        updateHeight();
        nav?.addEventListener('transitionend', updateHeight);
        
        return () => {
            nav?.removeEventListener('transitionend', updateHeight);
        };
    }, [setNavHeight]);

    return (
        <div ref={navRef} className="flex items-center justify-around w-full h-20 bg-[#3a3b5a] border-4 border-[#1b3b44] rounded-lg p-4 bg-[length:100%_4px] bg-[linear-gradient(#7e5c9b_50%,transparent_50%)]">
            <div onClick={() => onPageChange("chat")} className="flex items-center justify-center w-12 h-12 bg-[#7e5c9b] border-2 border-[#3a91a0] rounded-md">
                <Image src={ChatIcon} alt="Chat Icon" className="w-6 h-6" />
            </div>
            <div onClick={() => onPageChange("shop")} className="flex items-center justify-center w-12 h-12 bg-[#7e5c9b] border-2 border-[#3a91a0] rounded-md">
                <Image src={ShopIcon} alt="Shop Icon" className="w-6 h-6" />
            </div>
            <div onClick={() => onPageChange("ball")} className="flex items-center justify-center w-12 h-12 bg-[#7e5c9b] border-2 border-[#3a91a0] rounded-md">
                <Image src={BallIcon} alt="Ball Icon" className="w-6 h-6" />
            </div>
            <div onClick={() => onPageChange("info")} className="flex items-center justify-center w-12 h-12 bg-[#7e5c9b] border-2 border-[#3a91a0] rounded-md">
                <Image src={InfoIcon} alt="Info Icon" className="w-6 h-6" />
            </div>
            <div onClick={() => onPageChange("user")} className="flex items-center justify-center w-12 h-12 bg-[#7e5c9b] border-2 border-[#3a91a0] rounded-md">
                <Image src={PersonIcon} alt="Person Icon" className="w-6 h-6" />
            </div>
        </div>
    );
}