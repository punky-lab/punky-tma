import { UIState } from "@/lib/UI";
import PetInfo from "./PetInfo/PetInfo";
import Action from "./Action/Action";
import NavBar from "./Navigator/NavBar";
import Dog from "./Dog/Dog";
import ChatPage from "./SlideUI/ChatPage";
import ShopPage from "./SlideUI/ShopPage";
import InfoPage from "./SlideUI/InfoPage";
import UserPage from "./SlideUI/UserPage";
import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";

export type PageState = "chat" | "shop" | "info" | "user";

export default function Init({
  switchTo,
}: {
  switchTo: (target: UIState) => void;
}) {
  const [currentPage, setCurrentPage] = useState<PageState>("chat");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [springs, api] = useSpring(() => ({
    from: {
      maxHeight: 0,
    },
  }));

  const toggleAction = () => {
    setIsActionOpen(!isActionOpen);
  };

  const closeSlide = () => {
    setIsSlideOpen(false);
    api.start({
      from: {
        maxHeight: 288,
      },
      to: {
        maxHeight: 0,
      },
    });
  };

  const openSlide = () => {
    setIsSlideOpen(true);
    api.start({
      from: {
        maxHeight: 0,
      },
      to: {
        maxHeight: 288,
      },
    });
  };

  const changePage = (page: PageState) => {
    if (!isSlideOpen) {
      openSlide();
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "chat":
        return <ChatPage />;
      case "shop":
        return <ShopPage />;
      case "info":
        return <InfoPage />;
      case "user":
        return <UserPage />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full h-full relative">
      <PetInfo />
      <Dog onClick={closeSlide} />
      {isActionOpen && <Action />}
      <NavBar
        onPageChange={changePage}
        toggleAction={toggleAction}
        openSlide={openSlide}
        closeSlide={closeSlide}
      />
      <animated.div
        style={{
          overflow: "hidden",
          ...springs,
        }}
      >
        {renderPage()}
      </animated.div>
    </div>
  );
}
