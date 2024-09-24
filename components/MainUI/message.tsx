import { ChatMessage } from "@/lib/chat";
import React from "react";

export default function Message({ message }: { message: ChatMessage }) {
  if (message.role == "user")
    return (
      <div className="flex flex-row items-center justify-end w-full">
        <div className="bg-transparent border-2 border-blue-300 break-words p-2 mb-2 rounded shadow text-right">
          {message.content}
        </div>
        <div className="ml-4">You</div>
      </div>
    );
  if (message.role == "ai")
    return (
      <div className="flex flex-row items-center justify-start w-full">
        <div className="mr-4">AI</div>
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
