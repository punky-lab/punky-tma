import Image from "next/image";
import CartIcon from "@/assets/icons/cart.svg";
import InfoIcon from "@/assets/icons/info.svg";
import UserIcon from "@/assets/icons/user.svg";
import { UIState } from "@/lib/UI";
import Chat from "./chat";
import punkyFrames from "@/assets/animations/punky/idle";
import FrameAnimation from "../Animation";

export default function Main({
  switchTo,
}: {
  switchTo: (target: UIState) => void;
}) {
  return (
    <div className="flex flex-col w-full h-full px-2 py-4">
      <div className="flex flex-row w-full justify-between">
        <Image
          src={CartIcon}
          alt=""
          className="w-8 h-8"
          onClick={() => switchTo("store")}
        />
        <Image src={InfoIcon} alt="" className="w-8 h-8" />
        <Image
          src={UserIcon}
          alt=""
          className="w-8 h-8"
          onClick={() => switchTo("user")}
        />
      </div>
      <div className="grow flex items-center justify-center relative">
        <div className="absolute top-1/3 transform">
          <FrameAnimation
            frames={punkyFrames}
            interval={1000}
            width={128}
            height={128}
          />
        </div>
      </div>
      <Chat />
    </div>
  );
}
