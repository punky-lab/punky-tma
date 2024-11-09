import { useRef, useEffect } from "react";
import Image from "next/image";
import ChatIcon from "@/assets/ui/nav-01-chat.svg";
import ShopIcon from "@/assets/ui/nav-02-store.svg";
import BallIcon from "@/assets/ui/nav-03-ball.svg";
import InfoIcon from "@/assets/ui/nav-04-info.svg";
import PersonIcon from "@/assets/ui/nav-05-me.svg";
import SpriteBall from "../SpriteBall/SpriteBall";
import { useNavHeight } from "@/components/Root/navHeightContext";
import { PageState } from "../Main2";

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

  const openPage = (page: PageState) => {
    onPageChange(page);
    openSlide();
  };

  return (
    <div
      ref={navRef}
      className="flex items-center justify-around w-screen h-[95px] px-2.5 bg-no-repeat bg-[url('../assets/ui/top-bott-bar.svg')] bg-contain bg-bottom"
    >
      <div
        onClick={() => openPage("chat")}
        className="flex items-center justify-center w-12 h-12"
      >
        <Image src={ChatIcon} alt="Chat" />
      </div>
      <div
        onClick={() => openPage("shop")}
        className="flex items-center justify-center w-12 h-12"
      >
        <Image src={ShopIcon} alt="Shop" />
      </div>
      <div className="flex items-center justify-center w-12 h-12">
        <SpriteBall
          onPress={() => toggleAction()}
          onSwipeUp={() => openSlide()}
          onSwipeDown={() => closeSlide()}
        />
      </div>
      <div
        onClick={() => openPage("info")}
        className="flex items-center justify-center w-12 h-12"
      >
        <Image src={InfoIcon} alt="Info" />
      </div>
      <div
        onClick={() => openPage("user")}
        className="flex items-center justify-center w-12 h-12"
      >
        <Image src={PersonIcon} alt="User" />
      </div>
    </div>
  );
}
