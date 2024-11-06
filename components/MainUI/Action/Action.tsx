import React from 'react';
import Image from 'next/image';
import HandIcon from '@/assets/icons/v2/hand.svg';
import MicroIcon from '@/assets/icons/v2/micro.svg';
import GameIcon from '@/assets/icons/v2/game.svg';

export default function Action() {
    return (
        <div className="relative flex items-center justify-center w-full h-[150px] bg-[url('../assets/icons/v2/plate.svg')] bg-contain bg-center bg-no-repeat">
            {/* 手势图标 */}
            <div className="absolute left-20 bottom-1/4 flex items-center justify-center w-12 h-12 bg-[rgba(126,92,155,0.5)] border-2 border-[#3a91a0] rounded-full">
                <Image src={HandIcon} alt="Hand Icon" className="w-10 h-10" />
            </div>

            {/* 麦克风图标 */}
            <div className="absolute b flex top-10 items-center justify-center w-12 h-12 bg-[rgba(126,92,155,0.5)] border-2 border-[#3a91a0] rounded-full">
                <Image src={MicroIcon} alt="Micro Icon" className="w-10 h-10" />
            </div>

            {/* 游戏图标 */}
            <div className="absolute right-20 bottom-1/4 flex items-center justify-center w-12 h-12 bg-[rgba(126,92,155,0.5)] border-2 border-[#3a91a0] rounded-full">
                <Image src={GameIcon} alt="Game Icon" className="w-10 h-10" />
            </div>
        </div>
    );
};
