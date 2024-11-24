import { ChatMessage } from "@/lib/chat";
import React from "react";
import LoadingDots from "./Dog/bubbleLoadingDots";

export default function Message({ message }: { message: ChatMessage }) {
  if (message.role === "user")
    return (
      <div className="flex flex-row items-start justify-end w-full mb-2">
        <div
          className={`bg-blue-300 text-sm text-white break-words p-3 mb-2 rounded-lg shadow text-right max-w-[72%]`}
        >
          {message.content}
        </div>
        <div className="ml-2 rounded-full border-2 border-blue-300 p-1 px-2 text-blue-300 text-xs">
          ME
        </div>
      </div>
    );
  if (message.role === "ai")
    return (
      <div className="flex flex-row items-start justify-start w-full mb-2">
        <div
          className={`text-orange-300 p-1 px-2 rounded-full border-2 border-orange-300 mr-2 text-xs`}
        >
          AI
        </div>
        {message.type === "loading" ? (
          <div className="flex items-center h-[28px]">
            <LoadingDots />
          </div>
        ) : (
          <div
            className={`bg-orange-300 text-sm text-white break-words p-3 mb-2 rounded-lg text-left max-w-[72%]`}
          >
            {message.content}
          </div>
        )}
      </div>
    );
  if (message.role === "system")
    return (
      <div className="bg-red-600 text-white break-words p-3 mb-2 rounded shadow text-center max-w-[80%] mx-auto">
        {message.content}
      </div>
    );

  return <p>Unimplemented message role {message.role}</p>;
}
