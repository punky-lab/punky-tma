import { useEffect, useState } from "react";
import {
  IdleAnimation,
  LookUpAnimation,
  LookUpReverseAnimation,
  PressedAnimation,
} from "./animations";

interface SpriteBallProps {
  onPress?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  isLoading?: boolean;
}

type AnimationState = "idle" | "look-up" | "look-up-reverse" | "pressed";

export default function SpriteBall({
  onPress,
  onSwipeUp,
  onSwipeDown,
  isLoading,
}: SpriteBallProps) {
  const [animationState, setAnimationState] = useState<AnimationState>("idle");

  useEffect(() => {
    console.log("..animationState..", animationState);
  }, [animationState]);

  if (isLoading) {
    return "L";
  }

  function getAnimation() {
    switch (animationState) {
      case "idle":
        return <IdleAnimation />;
      case "look-up":
        return (
          <LookUpAnimation onEnd={() => setAnimationState("look-up-reverse")} />
        );
      case "look-up-reverse":
        return (
          <LookUpReverseAnimation onEnd={() => setAnimationState("idle")} />
        );
      case "pressed":
        return <PressedAnimation onEnd={() => setAnimationState("idle")} />;
    }
  }

  return (
    <div
      className="w-12 h-12"
      onTouchStart={(e) => {
        // detect swipe or touch event and prevent rapid firing
        if (animationState !== "idle") return;

        const touch = e.touches[0];
        const startY = touch.clientY;

        const handleTouchEnd = (e: TouchEvent) => {
          const touch = e.changedTouches[0];
          const deltaY = touch.clientY - startY;

          if (Math.abs(deltaY) < 10) {
            // It's a tap/press
            setAnimationState("pressed");
            onPress?.();
          } else if (deltaY < -30) {
            // Swipe up
            setAnimationState("look-up");
            onSwipeUp?.();
          } else if (deltaY > 30) {
            // Swipe down
            // setAnimationState("look-up");
            onSwipeDown?.();
          }

          document.removeEventListener("touchend", handleTouchEnd);
        };

        document.addEventListener("touchend", handleTouchEnd);
      }}
    >
      <div className="w-full h-full relative -top-20 -left-9">
        {getAnimation()}
      </div>
    </div>
  );
}
