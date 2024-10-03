"use client";

import Image from "next/image";
import CartIcon from "@/assets/icons/cart.svg";
import InfoIcon from "@/assets/icons/info.svg";
import UserIcon from "@/assets/icons/user.svg";
import FeedIcon from "@/assets/icons/feed.svg";
import TreatIcon from "@/assets/icons/treat.svg";
// import ToyIcon from "@/assets/icons/toy.svg";
import { UIState } from "@/lib/UI";
import Chat from "./chat";
import punkyFrames from "@/assets/animations/punky/idle"; // Default frames
import punkySitFrames from "@/assets/animations/punky/sit.gif"; // Sit frames
import punkyRollFrames from "@/assets/animations/punky/roll.gif"; // Roll frames
import punkyRunFrames from "@/assets/animations/punky/run.gif"; // Run frames
import FrameAnimation from "../FrameAnimation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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
  }, [window.innerHeight]);

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
      <div className="flex justify-end mt-8">
        <Link href="https://runner-game.punky.app/">
          <Image src={FeedIcon} alt="Feed" className="w-8 h-8 cursor-pointer" />
        </Link>
      </div>
      <div className="grow flex items-center justify-center relative">
        <div
          className={`absolute ${window.innerHeight >= 844 ? "top-[20%]" : "top-[12%]"} transform`}
          onTouchStart={(e: React.TouchEvent<HTMLDivElement>) =>
            handleTouchStart(e)
          }
          onTouchEnd={(e: React.TouchEvent<HTMLDivElement>) =>
            handleTouchEnd(e)
          }
        >
          <FrameAnimation
            frames={currentFrames} // 将字符串数组转换为对象数组
            interval={300} // Adjust as needed
            width={180}
            height={180}
            isThinking={isTalking}
          />
        </div>
        <div className="flex justify-around mt-8">
          <Image
            src={FeedIcon}
            alt="Feed"
            className="w-8 h-8 cursor-pointer mr-4"
            onClick={() => handleAction("feed")}
          />
          <Image
            src={FeedIcon}
            alt="Treat"
            className="w-8 h-8 cursor-pointer mr-4"
            onClick={() => handleAction("treat")}
          />
          <Image
            src={FeedIcon}
            alt="Toy"
            className="w-8 h-8 cursor-pointer"
            onClick={() => handleAction("play with toy")}
          />
        </div>
      </div>

      <Chat
        ref={chatRef} // 传递 ref
        setIsTalking={setIsTalking}
      />
    </div>
  );
}
