import { ChatMessage } from "@/lib/chat";
import React from "react";

export default function Message({ message }: { message: ChatMessage }) {
  if (message.role == "user")
    return (
      <div className="flex flex-row items-start justify-end w-full pl-14 mb-2">
        <div className="bg-transparent border-2 border-blue-300 break-words p-2 mb-2 rounded shadow text-right">
          {message.content}
        </div>
        <div className="ml-4 rounded-full border-2 border-blue-300 p-1 px-2 text-blue-300">
          ME
        </div>
      </div>
    );
  if (message.role == "ai")
    return (
      <div className="flex flex-row items-start justify-start w-full pr-14 mb-2">
        <div className="text-orange-300 p-1 px-2 rounded-full border-2 border-orange-300 mr-4">
          AI
        </div>
        <div className="bg-transparent border-2 border-orange-300 break-words p-2 mb-2 rounded shadow text-left">
          {message.content}
        </div>
      </div>
    );
  if (message.role == "system")
    return (
      <div className="bg-transparent border-2 border-red-600 break-words p-2 mb-2 rounded shadow text-center">
        {message.content}
      </div>
    );

  return <p>Unimplemented message role {message.role}</p>;
}
