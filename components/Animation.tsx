import Image from "next/image";
import { useEffect, useState } from "react";

interface FrameAnimationProps {
  frames: string[];
  interval: number;
  width: number;
  height: number;
}

export default function FrameAnimation({
  frames,
  interval,
  width,
  height,
}: FrameAnimationProps) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const frameCount = frames.length;
    if (frameCount === 0) return;

    const timer = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % frameCount);
    }, interval);

    return () => clearInterval(timer);
  }, [frames, interval]);

  if (frames.length === 0) {
    return <div>No frames to display</div>;
  }

  return (
    <Image
      src={frames[currentFrame]}
      alt={`frame-${currentFrame}`}
      width={width}
      height={height}
    />
  );
}
