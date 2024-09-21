import Image from 'next/image';
import { ReactNode } from "react";
import CloseIcon from "@/assets/icons/close.svg"

export default function PopUp({
  onClose,
  children,
}: {
  onClose: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="w-full h-full flex justify-center items-center z-30">
      <div className="bg-[url('../assets/ui/pop-up-bg.svg')] bg-cover bg-center w-4/5 h-4/5">
        <div onClick={onClose} className='w-full flex flex-row justify-end px-4 py-4'>
          <Image src={CloseIcon} alt='close' className='w-12 h-12' />
        </div>
        {children}
      </div>
    </div>
  );
}
