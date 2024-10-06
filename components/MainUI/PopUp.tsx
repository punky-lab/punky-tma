import Image from "next/image";
import { ReactNode } from "react";
import CloseIcon from "@/assets/icons/close.svg";

export default function PopUp({
  onClose,
  children,
  title,
}: {
  onClose?: () => void;
  title?: string;
  children?: ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-30">
      <div className="bg-[url('../assets/ui/pop-up-bg.svg')] bg-cover bg-center w-4/5 h-4/6 flex flex-col px-4">
        {onClose && (
          <div className="flex justify-end ">
            <Image
              src={CloseIcon}
              alt="close"
              className="w-10 h-10 cursor-pointer"
              onClick={onClose}
            />
          </div>
        )}
        {title && (
          <div className="flex flex-row justify-center items-center">
            <p className="text-2xl font-semibold">{title}</p>
          </div>
        )}
        <div className="flex-grow flex justify-center py-4">{children}</div>
      </div>
    </div>
  );
}
