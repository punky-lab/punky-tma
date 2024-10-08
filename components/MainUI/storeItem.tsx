"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ItemDetailModal from "../itemDetailModal";
import PopUp from "./PopUp";

interface StoreItemProps {
  image: string;
  name: string;
  owned: boolean;
}

export default function StoreItem({ image, name, owned }: StoreItemProps) {
  const [price, setPrice] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const randomPrice = Math.floor(Math.random() * (500 - 50 + 1) + 50);
    setPrice(randomPrice);
  }, []);

  const handleItemClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        // className="bg-gradient-to-br rounded-lg p-3 shadow-lg transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        // style={{
        //   background:
        //     "linear-gradient(90deg, rgba(58, 46, 81, 1), rgba(85, 70, 100, 1))",
        // }}
        className="bg-[url('../assets/ui/pop-up-bg.svg')] bg-cover bg-center px-4"
        onClick={handleItemClick}
      >
        <div className="rounded-lg pt-4">
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="w-full h-auto mx-auto rounded-md"
          />
        </div>
        {/* <div className="text-white text-[10px] text-center mb-2 h-10 flex items-center justify-center">
          {name}
        </div> */}
        {/* {owned ? (
          <div className="bg-green-500 text-white text-center py-1 rounded-full text-xs font-medium">
            Owned
          </div>
        ) : (
          <div className="bg-yellow-400 bg-opacity-80 rounded-full py-1 px-3 relative h-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="inline-block mr-1 text-base leading-none"
                style={{ marginTop: "-0.4em" }}
              >
                💰
              </span>
              <p className="text-purple-900 font-bold text-[10px] inline-block">
                {price}
              </p>
            </div>
          </div>
        )} */}
      </div>

      {isModalOpen && (
        <ItemDetailModal
          image={image}
          name={name}
          price={price}
          owned={owned}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
