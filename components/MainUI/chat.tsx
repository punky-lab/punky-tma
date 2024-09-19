"use client";

import Image from "next/image";
import ChatBoxUI from "@/assets/ui/chatbox.svg";
import PlayIcon from "@/assets/icons/play.svg";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const messageListRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    console.log("click");
    if (currentMessage.trim() !== "") {
      setMessages([...messages, currentMessage]);
      setCurrentMessage("");
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    console.log("touch");
    e.preventDefault();
    handleSendMessage();
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative w-full">
      {/** the message list is displayed here */}
      <div
        ref={messageListRef}
        className="absolute min-h-60 -translate-y-full w-full h-full overflow-y-auto p-3"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className="bg-transparent border-2 border-blue-300 break-words p-2 mb-2 rounded shadow"
          >
            {message}
          </div>
        ))}
      </div>
      <div className="w-full flex flex-row">
        <div className="relative grow">
          <Image className="w-full" src={ChatBoxUI} alt="" />
          <input
            type="text"
            className="absolute top-0 left-3 w-11/12 h-full bg-transparent text-black border-none outline-none"
            placeholder="Type your message here..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
        </div>
        <button
          className="ml-2 cursor-pointer z-50"
          onClick={handleSendMessage}
          onTouchStart={handleTouchStart}
        >
          <Image src={PlayIcon} alt="" />
        </button>
      </div>
    </div>
  );
}
