import punkyFrames from "@/assets/animations/punky/idle"; // Default frames
import punkySitFrames from "@/assets/animations/punky/sit.gif"; // Sit frames
import punkyRollFrames from "@/assets/animations/punky/roll.gif"; // Roll frames
import punkyRunFrames from "@/assets/animations/punky/run.gif"; // Run frames
import FrameAnimation from "@/components/FrameAnimation";
import { useState } from "react";
import LoadingDots from "../loadingDots";

export default function Dog({ onClick, loading, isPetting }: { onClick?: () => void, loading: boolean, isPetting: boolean }) {
  const [isTalking, setIsTalking] = useState(false);
  const [currentFrames, setCurrentFrames] = useState<any[]>(punkyFrames); // Default frames
  const [isSitting, setIsSitting] = useState(false);

  const handleSwipe = () => {
    if (isSitting) {
      setCurrentFrames(punkyFrames);
      setIsSitting(false);
    } else {
      setCurrentFrames([punkySitFrames]);
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

  return (
    <div className="grow flex flex-col items-center" onClick={onClick}>
      {loading && <div className="fixed top-[220px]"><LoadingDots /></div>}
      {isPetting && (
        <div className="fixed top-[220px] animate-[blink_1s_ease-in-out_infinite]">
          <i className="nes-icon is-medium heart"></i>
        </div>
      )}
      <div
        className="fixed top-[240px]"
        onTouchStart={(e: React.TouchEvent<HTMLDivElement>) =>
          handleTouchStart(e)
        }
        onTouchEnd={(e: React.TouchEvent<HTMLDivElement>) => handleTouchEnd(e)}
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
