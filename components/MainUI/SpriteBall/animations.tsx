import idleFrames from "@/assets/animations/SpriteBall/idle";
import lookUpFrames from "@/assets/animations/SpriteBall/look-up";
import pressedFrames from "@/assets/animations/SpriteBall/pressed";
import lookUpReverseFrames from "@/assets/animations/SpriteBall/look-up-reverse";
import Frames from "@/components/Frames";

interface OnceAnimationProps {
  onEnd?: () => void;
}

const animationConfig = {
  interval: 200,
  width: 52,
  height: 52,
};

export function IdleAnimation() {
  return (
    <Frames
      frames={idleFrames}
      interval={animationConfig.interval}
      width={animationConfig.width}
      height={animationConfig.height}
    />
  );
}

export function LookUpAnimation({ onEnd }: OnceAnimationProps) {
  return (
    <Frames
      frames={lookUpFrames}
      interval={animationConfig.interval}
      width={animationConfig.width}
      height={animationConfig.height}
      once
      onEnd={onEnd}
    />
  );
}

export function LookUpReverseAnimation({ onEnd }: OnceAnimationProps) {
  return (
    <Frames
      frames={lookUpReverseFrames}
      interval={animationConfig.interval}
      width={animationConfig.width}
      height={animationConfig.height}
      once
      onEnd={onEnd}
    />
  );
}

export function PressedAnimation({ onEnd }: OnceAnimationProps) {
  return (
    <Frames
      frames={pressedFrames}
      interval={animationConfig.interval}
      width={animationConfig.width}
      height={animationConfig.height}
      once
      onEnd={onEnd}
    />
  );
}
