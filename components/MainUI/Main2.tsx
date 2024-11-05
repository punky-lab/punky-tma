import { UIState } from "@/lib/UI";
import Image from "next/image";
import PetInfo from "./PetInfo/PetInfo";
import Action from "./Action/Action";
import NavBar from "./Navigator/NavBar";

export default function Init({
    switchTo,
}: {
    switchTo: (target: UIState) => void;
}) {
    const value = 50
    return (
        <div className="flex flex-col w-full h-full ">
            <PetInfo />
            <Action />
            <NavBar />
        </div>
    )
}