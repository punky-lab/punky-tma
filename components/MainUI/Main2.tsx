import { UIState } from "@/lib/UI";
import Image from "next/image";
import PetInfo from "./PetInfo/PetInfo";
import Action from "./Action/Action";
import NavBar from "./Navigator/NavBar";
import ChatPage from "./SlideUI/ChatPage";
import ShopPage from "./SlideUI/ShopPage";
import InfoPage from "./SlideUI/InfoPage";
import UserPage from "./SlideUI/UserPage";
import { useState } from "react";

export default function Init({
    switchTo,
}: {
    switchTo: (target: UIState) => void;
}) {
    const [currentPage, setCurrentPage] = useState<string | null>(null);

    const renderPage = () => {
        switch (currentPage) {
            case "chat": return <ChatPage/>;
            case "shop": return <ShopPage/>;
            case "info": return <InfoPage/>;
            case "user": return <UserPage/>;
            default: return null;
        }
    }

    return (
        <div className="flex flex-col w-full h-full relative">
            <PetInfo />
            <Action />
            <NavBar onPageChange={setCurrentPage} />
            {renderPage()}
        </div>
    )
}