import punkyFrames from "@/assets/animations/punky/idle"; // Default frames
import punkySitFrames from "@/assets/animations/punky/sit.gif"; // Sit frames
import punkyRollFrames from "@/assets/animations/punky/roll.gif"; // Roll frames
import punkyRunFrames from "@/assets/animations/punky/run.gif"; // Run frames
import FrameAnimation from "@/components/FrameAnimation";
import { useState } from "react";

export default function Dog({ onClick }: { onClick?: () => void }) {
  const [isTalking, setIsTalking] = useState(false);
  const [currentFrames, setCurrentFrames] = useState<any[]>(punkyFrames); // Default frames

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
  return (
    <div className="grow flex flex-col items-center" onClick={onClick}>
      <div
        className="fixed top-[29%]"
        onTouchStart={(e: React.TouchEvent<HTMLDivElement>) =>
          handleTouchStart(e)
        }
        onTouchEnd={(e: React.TouchEvent<HTMLDivElement>) => handleTouchEnd(e)}
      >
        <FrameAnimation
          frames={currentFrames}
          interval={300}
          width={180}
          height={180}
          isThinking={isTalking}
        />
      </div>
    </div>
  );
}
