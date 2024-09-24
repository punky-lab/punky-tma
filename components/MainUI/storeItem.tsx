"use client";

import Image from "next/image";

interface StoreItemProps {
  image: string;
  name: string;
  owned: boolean;
}

export default function StoreItem({ image, name, owned }: StoreItemProps) {
  return (
    <div className="bg-pink-500 bg-opacity-40 rounded-lg px-2 py-2 border-2 border-pink-500 flex flex-col items-center text-center text-white text-sm">
      <div className="border-2 border-pink-500 bg-purple-950 bg-opacity-40">
          <Image src={image} alt={name} width={64} height={64} />
      </div>
      <p className="h-12 flex flex-col justify-center">{name}</p>
      <p>{owned ? "owned" : "not owned"}</p>
    </div>
  );
}
