"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ItemDetailModal from "../itemDetailModal";

interface StoreItemProps {
  image: string;
  name: string;
  owned: boolean;
}

export default function StoreItem({ image, name }: StoreItemProps) {
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
        className="bg-gradient-to-br rounded-lg p-3 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        onClick={handleItemClick}
        style={{
          background:
            "linear-gradient(90deg, rgba(58, 46, 81, 1), rgba(85, 70, 100, 1))",
        }}
      >
        <div className="bg-white bg-opacity-20 rounded-lg p-2 mb-2">
          <Image
            src={image}
            alt={name}
            width={64}
            height={64}
            className="mx-auto rounded-md"
          />
        </div>
        <div className="text-white text-xs text-center mb-2 h-10 flex items-center justify-center">
          {name}
        </div>
      </div>
      {isModalOpen && (
        <ItemDetailModal
          image={image}
          name={name}
          price={price}
          owned={true}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
