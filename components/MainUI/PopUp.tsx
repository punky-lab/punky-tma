import Image from "next/image";
import { ReactNode } from "react";
import CloseIcon from "@/assets/icons/close.svg";

export default function PopUp({
  onClose,
  children,
  title,
}: {
  onClose: () => void;
  title?: string;
  children?: ReactNode;
}) {
  return (
    <div className="w-full h-full flex justify-center items-center z-30">
      <div className="bg-[url('../assets/ui/pop-up-bg.svg')] bg-cover bg-center w-4/5 h-4/5">
        <div
          onClick={onClose}
          className="w-full flex flex-row justify-between px-4 py-4 items-center"
        >
          <div className="w-10 h-10">{/* balance */}</div>
          <p className="text-2xl font-semibold">{title}</p>
          <Image src={CloseIcon} alt="close" className="w-10 h-10" />
        </div>
        {children}
      </div>
    </div>
  );
}
