import Image from "next/image";
import CloseIcon from "@/assets/icons/close.svg";
import { div } from "framer-motion/client";

interface ItemDetailModalProps {
  image: string;
  name: string;
  price: number;
  owned: boolean;
  onClose: () => void;
}

export default function ItemDetailModal({
  image,
  name,
  price,
  owned,
  onClose,
}: ItemDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div
        // className="bg-gradient-to-br bg-opacity-70 rounded-lg p-6 max-w-sm w-3/5 shadow-lg"
        // style={{ backgroundColor: "rgba(58, 46, 81, 0.7)" }}
        className={`bg-[url('../assets/ui/pop-up-bg.svg')] bg-cover bg-center w-7/12  min-h-[400px] mt-10`}
      >
        <div className="flex justify-end">
          <Image
            src={CloseIcon}
            alt="close"
            className="w-10 h-10 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="bg-[url('../assets/ui/pop-title.svg')] bg-cover bg-center w-2/3  min-h-[68px] p-4 flex justify-center items-center">
            <p className="text-xl font-semibold">Detail</p>
          </div>
        </div>
        <div className="flex flex-col items-center p-4">
          <div className="flex justify-center items-center mb-4">
            <Image
              src={image}
              alt={name}
              width={100}
              height={100}
              className="rounded-md"
            />
          </div>
          <h2 className=" text-white font-[12px]">{name}</h2>
          <div className="flex items-center justify-center mb-4">
            <span className="text-lg text-gray-200 mr-2 mb-2">💰</span>
            <p className="text-lg mb-0 text-gray-200">{price}</p>
          </div>
          {owned ? (
            <div className="flex flex-row justify-center items-center">
              <div className="bg-[url('../assets/ui/pop-label.svg')] bg-cover bg-center w-2/3  min-h-[60px] p-4 flex justify-center items-center">
                <p className="text-[12px] font-semibold">Equip</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center w-full">
              <div className="bg-[url('../assets/ui/pop-label.svg')] bg-cover bg-center w-2/3  min-h-[56px] p-4 flex justify-center items-center">
                <p className="text-[12px] font-semibold">Buy</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
