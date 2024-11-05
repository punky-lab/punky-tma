import React from 'react';
import Image from 'next/image';
import HandIcon from '@/assets/icons/v2/hand.svg';
import MicroIcon from '@/assets/icons/v2/micro.svg';
import GameIcon from '@/assets/icons/v2/game.svg';

export default function Action() {
    return (
        <div className="relative flex items-center justify-center w-full h-[150px] bg-[url('../assets/icons/v2/plate.svg')] bg-contain bg-center bg-no-repeat">
            {/* 手势图标 */}
            <div className="absolute left-1/4 bottom-1/3 flex items-center justify-center w-10 h-10 bg-[#7e5c9b] border-2 border-[#3a91a0] rounded-full">
                <Image src={HandIcon} alt="Hand Icon" className="w-8 h-8" />
            </div>

            {/* 麦克风图标 */}
            <div className="absolute bottom-1/6 flex items-center justify-center w-10 h-10 bg-[#7e5c9b] border-2 border-[#3a91a0] rounded-full">
                <Image src={MicroIcon} alt="Micro Icon" className="w-8 h-8" />
            </div>

            {/* 游戏图标 */}
            <div className="absolute right-1/4 bottom-1/3 flex items-center justify-center w-10 h-10 bg-[#7e5c9b] border-2 border-[#3a91a0] rounded-full">
                <Image src={GameIcon} alt="Game Icon" className="w-8 h-8" />
            </div>
        </div>
    );
};
