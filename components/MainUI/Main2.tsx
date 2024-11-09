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

export type PageState = "chat" | "shop" | "info" | "user";

export default function Init({
  switchTo,
}: {
  switchTo: (target: UIState) => void;
}) {
  const [currentPage, setCurrentPage] = useState<PageState>("chat");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAction = () => {
    setIsActionOpen(!isActionOpen);
  };

  const closeSlide = () => {
    setIsOpen(false);
  };

  const openSlide = () => {
    setIsOpen(true);
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
        onPageChange={setCurrentPage}
        toggleAction={toggleAction}
        openSlide={openSlide}
        closeSlide={closeSlide}
      />
      {isOpen && (
        <div className="max-h-72 overflow-hidden">{renderPage()}</div>
      )}
    </div>
  );
}
