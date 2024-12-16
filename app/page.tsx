"use client";

import Init from "@/components/MainUI/Init";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-[url('../assets/scenes/main.webp')] bg-cover bg-top text-white overflow-hidden">
      <div className="overflow-y-auto h-full">
        <Init />
      </div>
    </div>
  );
}
