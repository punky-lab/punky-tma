"use client";

import Image from "next/image";
import CartIcon from "@/assets/icons/cart.svg";
import InfoIcon from "@/assets/icons/info.svg";
import UserIcon from "@/assets/icons/user.svg";
import FeedIcon from "@/assets/icons/feed.svg";
import TreatIcon from "@/assets/icons/treat.svg";
import ToyIcon from "@/assets/icons/toy.svg";
import PlayIcon from "@/assets/icons/play.svg";
import WalletIcon from "@/assets/icons/wallet.svg";
import TOPlayIcon from "@/assets/icons/toPlay.svg";
import Right1 from "@/assets/icons/right1.svg";
import Right2 from "@/assets/icons/right2.svg";
import HealthIcon from "@/assets/icons/health.svg";
import LoyaltyIcon from "@/assets/icons/loyalty.svg";
import FitnessIcon from "@/assets/icons/fitness.svg";
import { UIState } from "@/lib/UI";

import Chat from "./chat";
import punkyFrames from "@/assets/animations/punky/idle"; // Default frames
import punkySitFrames from "@/assets/animations/punky/sit.gif"; // Sit frames
import punkyRollFrames from "@/assets/animations/punky/roll.gif"; // Roll frames
import punkyRunFrames from "@/assets/animations/punky/run.gif"; // Run frames

import FrameAnimation from "../FrameAnimation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/**
 * @deprecated Use Init component from Init.tsx
 */
export default function Main({
  switchTo,
}: {
  switchTo: (target: UIState) => void;
}) {
  const [isTalking, setIsTalking] = useState(false);
  const [currentFrames, setCurrentFrames] = useState<any[]>(punkyFrames); // Default frames
  const chatRef = useRef<any>(null); // 创建 ref
  const [viewHeight, setViewHeight] = useState(0);

  const handleSwipe = () => {
    const animations = [punkySitFrames, punkyRollFrames, punkyRunFrames];
    const randomAnimationIndex = Math.floor(Math.random() * animations.length);
    const randomAnimation = animations[randomAnimationIndex];

    setCurrentFrames([randomAnimation]);

    setTimeout(() => {
      setCurrentFrames(punkyFrames); // 恢复到默认帧动画
    }, 3000); // 2 秒后恢复
  };

  let touchStartX: number | null = null;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX = e.touches[0].clientX; // 记录触摸开始时的 X 坐标
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX; // 记录触摸结束时的 X 坐标
    const diffX = touchEndX - (touchStartX || 0); // 计算 X 坐标的差值

    if (Math.abs(diffX) > 20) {
      // 保持阈值为 20
      handleSwipe(); // 触发随机动画
    }
  };

  const handleAction = (action: string) => {
    console.log(`I just ${action}`);
    if (chatRef.current) {
      chatRef.current.handleSendMessage(`I just ${action}`); // 调用子组件的函数
    }
  };

  useEffect(() => {
    const viewportHeight = window.innerHeight;
    console.log(viewportHeight); // 输出当前视口高度
    setViewHeight(viewHeight);
  }, [viewHeight]);

  return (
    <div className="flex flex-col w-full h-full px-2 py-4">
      <div className="flex flex-row w-full justify-between">
        <Image
          src={CartIcon}
          alt=""
          className="w-8 h-8"
          onClick={() => switchTo("store")}
        />
        <Image
          src={InfoIcon}
          alt=""
          className="w-8 h-8"
          onClick={() => switchTo("achieve")}
        />
        <Image
          src={UserIcon}
          alt=""
          className="w-8 h-8"
          onClick={() => switchTo("user")}
        />
      </div>
      <div className="flex justify-between items-center">
        {/* 左侧图标 */}
        <Image
          src={WalletIcon}
          width={40}
          height={40}
          alt="Feed"
          className="cursor-pointer"
          onClick={() => switchTo("wallet")}
        />

        {/* 中间图标组 */}
        <div
          className="relative flex justify-center items-center w-56 h-20
        bg-[url('../assets/icons/CTA.svg')] bg-contain bg-center bg-no-repeat"
        >
          {/* Image 组 */}
          <div className="flex justify-center relative z-10 text-[8px]">
            <div className="flex flex-col items-center">
              <Image
                src={HealthIcon}
                alt="Health"
                className="w-35 h-35 cursor-pointer mx-2"
              />
              <div className="text-red-500">10</div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={LoyaltyIcon}
                alt="Loyalty"
                className="w-35 h-35 cursor-pointer mx-2"
              />
              <span className="text-yellow-600">100</span>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={FitnessIcon}
                alt="Fitness"
                className="w-35 h-35 cursor-pointer mx-2"
              />
              <span className="text-blue-500">50</span>
            </div>
          </div>
        </div>

        {/* 右侧图标 */}
        <Image
          src={TOPlayIcon}
          alt="Feed"
          className="w-35 h-35 cursor-pointer"
        />
      </div>

      <div className="grow flex justify-center relative">
        <div
          className={`flex flex-row absolute ${window.innerHeight >= 844 ? "top-[20%]" : "top-[12%]"} items-center`}
        >
          <div className="flex flex-col mr-4">
            <Image
              src={FeedIcon}
              alt="Feed"
              className="w-35 h-35 cursor-pointer mb-4"
              onClick={() => handleAction("feed")}
            />
            <Image
              src={TreatIcon}
              alt="Treat"
              className="w-35 h-35 cursor-pointer mb-4"
              onClick={() => handleAction("treat")}
            />
            <Image
              src={ToyIcon}
              alt="Toy"
              className="w-35 h-35 cursor-pointer"
              onClick={() => handleAction("play with toy")}
            />
          </div>
          <div
            onTouchStart={(e: React.TouchEvent<HTMLDivElement>) =>
              handleTouchStart(e)
            }
            onTouchEnd={(e: React.TouchEvent<HTMLDivElement>) =>
              handleTouchEnd(e)
            }
          >
            <FrameAnimation
              frames={currentFrames}
              interval={300}
              width={180}
              height={180}
              isThinking={isTalking}
            />
          </div>
          <div className="flex flex-col items-center ml-4">
            <Image
              src={Right1}
              alt="Action 1"
              className="w-35 h-35 cursor-pointer mb-4"
            />
            <Image
              src={Right2}
              alt="Action 2"
              className="w-35 h-35 cursor-pointer"
            />
          </div>
        </div>
        <div
          className="absolute flex flex-col items-center"
          style={{
            top: `${window.innerHeight >= 844 ? `${window.innerHeight * 0.2 + 160}px` : `${window.innerHeight * 0.12 + 160}px`}`,
          }}
        >
          <Link href="https://runner-game.punky.app/">
            <Image
              src={PlayIcon}
              alt="Action 2"
              className="w-116 h-53 cursor-pointer"
            />
          </Link>
        </div>
      </div>

      <Chat ref={chatRef} setIsTalking={setIsTalking} />
    </div>
  );
}
