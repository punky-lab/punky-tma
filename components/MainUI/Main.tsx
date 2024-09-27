"use client";

import Image from "next/image";
import CartIcon from "@/assets/icons/cart.svg";
import InfoIcon from "@/assets/icons/info.svg";
import UserIcon from "@/assets/icons/user.svg";
import { UIState } from "@/lib/UI";
import Chat from "./chat";
import punkyFrames from "@/assets/animations/punky/idle"; // Default frames
import punkySitFrames from "@/assets/animations/punky/sit.gif"; // Sit frames
import punkyRollFrames from "@/assets/animations/punky/roll.gif"; // Roll frames
import punkyRunFrames from "@/assets/animations/punky/run.gif"; // Run frames
import FrameAnimation from "../Animation";
import { useState } from "react";

export default function Main({
  switchTo,
}: {
  switchTo: (target: UIState) => void;
}) {
  const [isTalking, setIsTalking] = useState(false);
  const [currentFrames, setCurrentFrames] = useState<any[]>(punkyFrames); // Default frames

  const handleSwipe = () => {
    const animations = [punkySitFrames, punkyRollFrames, punkyRunFrames];
    const randomAnimationIndex = Math.floor(Math.random() * animations.length);
    const randomAnimation = animations[randomAnimationIndex];

    console.log(">>>>", randomAnimation);
    setCurrentFrames([randomAnimation]); // 直接使用 randomAnimation
  };

  let touchStartX: number | null = null; // 初始化为 null

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX = e.touches[0].clientX; // 记录触摸开始时的 X 坐标
    console.log(">>touchStartX>>>>", touchStartX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return; // 确保 touchStartX 已被设置
    const touchEndX = e.changedTouches[0].clientX; // 记录触摸结束时的 X 坐标
    console.log(">>touchEndX>>>>", touchEndX); // 打印 touchEndX 的值
    const diffX = touchEndX - (touchStartX || 0); // 计算 X 坐标的差值

    console.log(".....", diffX); // 打印 diffX 的值
    if (Math.abs(diffX) > 20) {
      // 保持阈值为 30
      handleSwipe(); // 触发随机动画
    }
  };

  // 添加 touchmove 事件监听器以更新 touchStartX
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // touchStartX = e.touches[0].clientX; // 移除这一行
    console.log(">>touchMoveX>>>>", e.touches[0].clientX); // 打印当前触摸的 X 坐标
  };

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
      <div className="grow flex items-center justify-center relative">
        <div
          className="absolute top-1/4 transform"
          onTouchStart={(e: React.TouchEvent<HTMLDivElement>) =>
            handleTouchStart(e)
          }
          onTouchEnd={(e: React.TouchEvent<HTMLDivElement>) =>
            handleTouchEnd(e)
          }
          onTouchMove={(e: React.TouchEvent<HTMLDivElement>) =>
            handleTouchMove(e)
          }
        >
          <FrameAnimation
            frames={currentFrames} // 将字符串数组转换为对象数组
            interval={100} // Adjust as needed
            width={180}
            height={180}
            isThinking={isTalking}
          />
        </div>
      </div>
      <Chat
        onChatStart={() => setIsTalking(true)}
        onChatEnd={() => setIsTalking(false)}
      />
    </div>
  );
}
