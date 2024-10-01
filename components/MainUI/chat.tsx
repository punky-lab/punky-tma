"use client";

import Image from "next/image";
import ChatBoxUI from "@/assets/ui/chatbox.svg";
import PlayIcon from "@/assets/icons/play.svg";
import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { ChatMessage } from "@/lib/chat";
import Message from "@/components/MainUI/message";
import { getGaiaNetResponse } from "@/app/api/chat";

interface ChatProps {
  onChatStart: () => void;
  onChatEnd: () => void;
}

const Chat = forwardRef((props, ref) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (message?: string) => {
    if (currentMessage.trim() === "" && !message) {
      return;
    }
    const content = message?.trim() ?? currentMessage.trim();
    setMessages([...messages, { role: "user", content: content }]);
    setCurrentMessage("");
    setIsLoading(true);
    getGaiaNetResponse(content)
      .then((reply) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "ai", content: reply },
        ]);
      })
      .catch((error) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "system", content: `ERROR: ${error}` },
        ]);
      })
      .finally(() => {
        setIsLoading(false);
      });
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.style.height = "44px"; // 恢复高度
    }
  };

  useImperativeHandle(ref, () => ({
    handleSendMessage: (message: string) => {
      handleSendMessage(message);
    },
  }));

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.style.height = "44px"; // 恢复高度
    }
  }, []);

  return (
    <div className="relative w-full">
      <div
        ref={messageListRef}
        className="absolute min-h-60 -translate-y-full w-full h-full overflow-y-auto" // 去掉阴影
      >
        {messages.map((message, index) => (
          <Message message={message} key={index} />
        ))}
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <textarea
          className="w-full text-black p-2 box-border border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Chat now"
          value={currentMessage}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(); // 发送消息
              e.currentTarget.style.height = "44px"; // 恢复高度
            }
          }}
          style={{
            resize: "none",
            overflow: "hidden",
            minHeight: "40px",
            lineHeight: "1.5",
          }} // 设置行高
        />
        <Image
          src={PlayIcon}
          alt=""
          onClick={() => handleSendMessage()}
          className="ml-2 cursor-pointer z-50"
        />
      </div>
    </div>
  );
});

Chat.displayName = "Chat";

export default Chat;
