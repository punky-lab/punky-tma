import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ThinkingBubble from "./thinkingBubble";

interface FrameAnimationProps {
  frames: { src: string }[]; // frames 是包含 src 字段的对象数组
  interval: number; // 动画帧切换间隔
  width: number; // 图片宽度
  height: number; // 图片高度
  isThinking: boolean;
}

export default function FrameAnimation({
  frames,
  interval,
  width,
  height,
  isThinking = true,
}: FrameAnimationProps) {
  const [currentFrame, setCurrentFrame] = useState(0); // 当前帧索引
  const preloadedImages = useRef<HTMLImageElement[]>([]); // 用于存储预加载的图像
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 预加载图像
  useEffect(() => {
    if (frames.length === 0) return;

    let loadedCount = 0;
    console.log("..frames..", frames);
    preloadedImages.current = frames.map((frame) => {
      const img = new window.Image();

      console.log("..🍷..", frame.src);
      img.src = frame.src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frames.length) {
          setImagesLoaded(true);
        }
      };
      return img;
    });
  }, [frames]);

  // 使用定时器切换动画帧
  useEffect(() => {
    if (!imagesLoaded) return;

    const timer = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length);
    }, interval);

    return () => clearInterval(timer); // 在组件卸载时清理定时器
  }, [frames.length, interval, imagesLoaded]);

  if (frames.length === 0 || !imagesLoaded) {
    return <div>加载中...</div>;
  }

  console.log(">preloadedImages>>", preloadedImages.current);

  return (
    <div style={{ width, height, position: "relative" }}>
      {isThinking && (
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="relative w-full h-full">
            {isThinking && <ThinkingBubble />}
          </div>
        </div>
      )}
      {preloadedImages.current.map((img, index) => (
        <Image
          key={index}
          src={img.src} // 使用缓存的图像对象
          alt={`frames-${index}`}
          width={width}
          height={height}
          priority={index === 0} // 优先加载第一帧
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: index === currentFrame ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}
