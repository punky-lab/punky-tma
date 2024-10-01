"use client";

import Image from "next/image";
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

const Chat = forwardRef((props, ref) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const messageListRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = (message?: string) => {
    if (currentMessage.trim() === "" && !message) {
      return;
    }
    const content = message?.trim() ?? currentMessage.trim();
    setMessages([...messages, { role: "user", content: content }]);
    setCurrentMessage("");
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
      });
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

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMessage(e.target.value);
    if (textareaRef.current) {
      const lineHeight = 20; // 设置行高
      const lines = Math.floor(e.target.scrollHeight / lineHeight);
      // 只在内容超过一行时调整高度
      if (lines > 1) {
        textareaRef.current.style.height = `${Math.min(lines, 4) * lineHeight}px`; // 限制最大高度
      } else {
        textareaRef.current.style.height = "40px"; // 恢复到初始高度
      }
    }
  };

  return (
    <div className="relative w-full">
      <div
        ref={messageListRef}
        className="absolute min-h-60 -translate-y-full w-full h-full overflow-y-auto"
      >
        {messages.map((message, index) => (
          <Message message={message} key={index} />
        ))}
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <textarea
          ref={textareaRef}
          className="w-full text-black p-2 box-border border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Chat now"
          value={currentMessage}
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // 阻止换行
              handleSendMessage();
              if (textareaRef.current) {
                textareaRef.current.style.height = "40px"; // 恢复高度
              }
              setCurrentMessage(""); // 清空输入框
            }
          }}
          rows={1}
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
