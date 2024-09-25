"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface StoreItemProps {
  image: string;
  name: string;
  owned: boolean;
  price?: number;
}

export default function StoreItem({
  image,
  name,
  owned,
  // price = 100,
}: StoreItemProps) {
  const [price, setPrice] = useState<number>(0);

  // TODO 暂时mock数据
  useEffect(() => {
    // 生成 50 到 500 之间的随机价格
    const randomPrice = Math.floor(Math.random() * (500 - 50 + 1) + 50);
    setPrice(randomPrice);
  }, []);

  return (
    <div className="bg-pink-500 bg-opacity-40 rounded-lg px-2 py-2 border-2 border-pink-500 flex flex-col items-center text-center text-white text-sm">
      <div className="border-2 border-pink-500 bg-purple-950 bg-opacity-40">
        <Image src={image} alt={name} width={64} height={64} />
      </div>
      <p className="h-12 flex flex-col justify-center">{name}</p>
      {owned ? (
        <p className="text-green-300">owned</p>
      ) : (
        <div className="flex items-center space-x-1">
          <span className="text-yellow-300">💰</span>
          <p className="text-yellow-300">{price}</p>
        </div>
      )}
    </div>
  );
}
