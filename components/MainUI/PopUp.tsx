import { ReactNode } from "react";

export default function PopUp({
  onClose,
  children,
}: {
  onClose: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-[url('../assets/ui/pop-up-bg.svg')] bg-cover bg-center w-4/5 h-4/5">
        <div onClick={onClose}>close</div>
        {children}
      </div>
    </div>
  );
}
