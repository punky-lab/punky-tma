import punkyFrames from "@/assets/animations/punky/idle"; // Default frames
import punkySitFrames from "@/assets/animations/punky/sit.gif"; // Sit frames
import punkyRollFrames from "@/assets/animations/punky/roll.gif"; // Roll frames
import punkyRunFrames from "@/assets/animations/punky/run.gif"; // Run frames
import punkyNodFrames from "@/assets/animations/punky/nod.gif";
import punkySpinFrames from "@/assets/animations/punky/spin.gif";
import punkyStandFrames from "@/assets/animations/punky/stand.gif";
import FrameAnimation from "@/components/FrameAnimation";

import { useEffect, useState } from "react";

import BubbleLoadingDots from "./bubbleLoadingDots";
import BubbleMessage from "./bubbleMessage";

export default function Dog({
  onClick,
  loading,
  isPetting,
  emojisContent,
}: {
  onClick?: () => void;
  loading: boolean;
  isPetting: boolean;
  emojisContent: string;
}) {
  const [isTalking, setIsTalking] = useState(false);
  const [currentFrames, setCurrentFrames] = useState<any[]>(punkyFrames); // Default frames
  const [isSitting, setIsSitting] = useState(false);

  const handleSwipe = () => {
    if (isSitting) {
      setCurrentFrames(punkyFrames);
      setIsSitting(false);
    } else {
      // 创建一个动作帧数组
      const animations = [
        punkySitFrames,
        punkyRollFrames,
        punkyNodFrames,
        punkySpinFrames,
        punkyStandFrames,
      ];

      // 随机选择一个动作
      const randomIndex = Math.floor(Math.random() * animations.length);
      setCurrentFrames([animations[randomIndex]]);
      setIsSitting(true);
    }
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

  useEffect(() => {
    if (isPetting) {
      setCurrentFrames([punkyNodFrames]);
    }
  }, [isPetting]);

  return (
    <div className="grow flex flex-col items-center" onClick={onClick}>
      {loading && (
        <div className="fixed top-[26vh]">
          <BubbleLoadingDots />
        </div>
      )}
      {!loading && emojisContent !== "" && (
        <div className="fixed top-[20vh]">
          <BubbleMessage message={emojisContent} />
        </div>
      )}
      {/* {isPetting && (
        <div className="fixed top-[26vh] animate-[blink_1s_ease-in-out_infinite]">
          <i className="nes-icon is-medium heart"></i>
        </div>
      )} */}
      <div
        className="fixed top-[28vh] "
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <FrameAnimation
          frames={currentFrames}
          interval={800}
          width={180}
          height={180}
          isThinking={isTalking}
        />
      </div>
    </div>
  );
}
