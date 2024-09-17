"use client";

import Main from "@/components/MainUI/Main";
import Store from "@/components/MainUI/Store";
import { UIState } from "@/lib/UI";
import { ReactNode, useState } from "react";

export default function Home() {
  const [currentUI, setCurrentUI] = useState<UIState>("main");
  const UIShowing = new Map<UIState, ReactNode>([
    ["main", <Main switchTo={(target) => setCurrentUI(target)} />],
    ["store", <Store onClose={() => setCurrentUI("main")} />],
  ]);
  return (
    <div className="h-screen w-screen bg-[url('../assets/scenes/main.png')] bg-cover bg-top">
      {UIShowing.get(currentUI)}
    </div>
  );
}
