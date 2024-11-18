import { useRef, useEffect } from "react";
import Image from "next/image";
import ChatIcon from "@/assets/ui/nav-01-chat.svg";
import ShopIcon from "@/assets/ui/nav-02-store.svg";
import BallIcon from "@/assets/ui/nav-03-ball.svg";
import InfoIcon from "@/assets/ui/nav-04-info.svg";
import PersonIcon from "@/assets/ui/nav-05-me.svg";
import SpriteBall from "../SpriteBall/SpriteBall";
import { useNavHeight } from "@/components/Root/navHeightContext";
import { PageState } from "../Init";

interface NavBarProps {
  onPageChange: (page: PageState) => void;
  toggleAction: () => void;
  openSlide: () => void;
  closeSlide: () => void;
}

export default function NavBar({
  onPageChange,
  toggleAction,
  openSlide,
  closeSlide,
}: NavBarProps) {
  const { setNavHeight } = useNavHeight();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const updateHeight = () => {
      if (nav) {
        setNavHeight(nav.offsetHeight);
      }
    };

    updateHeight();
    nav?.addEventListener("transitionend", updateHeight);

    return () => {
      nav?.removeEventListener("transitionend", updateHeight);
    };
  }, [setNavHeight]);

  return (
    <div
      ref={navRef}
      className="flex items-center justify-around w-screen h-[95px] px-2.5 bg-no-repeat bg-[url('../assets/ui/top-bott-bar.svg')] bg-contain bg-bottom z-20"
    >
      <div className="flex items-center justify-center">
        <div
          onClick={() => onPageChange("chat")}
          className="flex items-center justify-center w-12 h-12 mr-3"
        >
          <Image src={ChatIcon} alt="Chat" />
        </div>
        <div
          onClick={() => onPageChange("shop")}
          className="flex items-center justify-center w-12 h-12"
        >
          <Image src={ShopIcon} alt="Shop" />
        </div>
      </div>

      <div className="flex items-center justify-center w-12 h-12">
        <SpriteBall
          onPress={() => toggleAction()}
          onSwipeUp={() => openSlide()}
          onSwipeDown={() => closeSlide()}
        />
      </div>

      <div className="flex items-center justify-center">
        <div
          onClick={() => onPageChange("info")}
          className="flex items-center justify-center w-12 h-12 mr-3"
        >
          <Image src={InfoIcon} alt="Info" />
        </div>
        <div
          onClick={() => onPageChange("user")}
          className="flex items-center justify-center w-12 h-12"
        >
          <Image src={PersonIcon} alt="User" />
        </div>
      </div>
    </div>
  );
}
