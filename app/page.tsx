"use client";

import Store from "@/components/MainUI/Store";
import Achieve from "@/components/MainUI/achieve";
import User from "@/components/MainUI/User";
import { UIState } from "@/lib/UI";
import { ReactNode, useCallback, useState } from "react";
import Wallet from "@/components/MainUI/Wallet";
import Init from "@/components/MainUI/Init";

export default function Home() {
  const [currentUI, setCurrentUI] = useState<UIState>("main");
  const popUpClose = useCallback(() => setCurrentUI("main"), []);

  const UIShowing = new Map<UIState, ReactNode>([
    ["main", <Init key="main" switchTo={(target) => setCurrentUI(target)} />],
    ["store", <Store key="store" onClose={popUpClose} />],
    ["user", <User key="user" onClose={popUpClose} />],
    ["achieve", <Achieve key="achieve" onClose={popUpClose} />],
    ["wallet", <Wallet key="wallet" onClose={popUpClose} />]
  ]);

  return (
    <div className="h-screen w-screen bg-[url('../assets/scenes/main.webp')] bg-cover bg-top text-white overflow-hidden">
      <div className="overflow-y-auto h-full">{UIShowing.get(currentUI)}</div>
    </div>
  );
}
