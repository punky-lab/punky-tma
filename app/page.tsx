"use client";

import FrameAnimation from "@/components/Animation";
import Main from "@/components/MainUI/Main";
import Store from "@/components/MainUI/Store";
import User from "@/components/MainUI/User";
import { UIState } from "@/lib/UI";
import { ReactNode, useCallback, useState } from "react";
import punkyFrames from "@/assets/animations/punky/idle";

export default function Home() {
  const [currentUI, setCurrentUI] = useState<UIState>("main");
  const popUpClose = useCallback(() => setCurrentUI("main"), []);

  const UIShowing = new Map<UIState, ReactNode>([
    ["main", <Main switchTo={(target) => setCurrentUI(target)} />],
    ["store", <Store onClose={popUpClose} />],
    ["user", <User onClose={popUpClose} />],
  ]);

  return (
    <div className="h-screen w-screen bg-[url('../assets/scenes/main.png')] bg-cover bg-top">
      {UIShowing.get(currentUI)}
      {/* <div className="absolute w-screen h-screen flex flex-col items-center top-1/3 z-0">
        <div className="-translate-y-1/3">
          <FrameAnimation
            frames={punkyFrames}
            interval={1000}
            width={180}
            height={180}
          />
        </div>
      </div> */}
    </div>
  );
}
