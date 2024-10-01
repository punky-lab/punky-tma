"use client";

import Image from "next/image";
import PlayIcon from "@/assets/icons/play.svg";
import MicrophoneIcon from "@/assets/icons/microphone.svg"; // 添加语音输入图标
import KeyboardIcon from "@/assets/icons/keyboard.svg"; // 添加键盘输入图标
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
import ThinkingBubble from "@/components/thinkingBubble"; // 引入 ThinkingBubble

interface Props {
  setIsTalking: any;
}

const Chat = forwardRef((props: Props, ref) => {
  const { setIsTalking } = props;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [loading, setLoading] = useState(false); // 新增 loading 状态
  const [isVoiceMode, setIsVoiceMode] = useState(false); // 用于切换语音和键盘模式
  const messageListRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [recognition, setRecognition] = useState<any>(null); // 语音识别实例
  const [isListening, setIsListening] = useState(false); // 语音识别状态

  useEffect(() => {
    // 初始化语音识别
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false; // 不连续识别
      recognitionInstance.interimResults = false; // 不返回中间结果

      recognitionInstance.onresult = (event: {
        results: { transcript: any }[][];
      }) => {
        const transcript = event.results[0][0].transcript; // 获取识别结果
        setCurrentMessage(transcript); // 设置输入框内容
        handleSendMessage(transcript); // 发送识别到的消息
      };

      recognitionInstance.onend = () => {
        setIsListening(false); // 识别结束
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const handleSendMessage = (message?: string) => {
    if (currentMessage.trim() === "" && !message) {
      return;
    }
    const content = message?.trim() ?? currentMessage.trim();
    setMessages([...messages, { role: "user", content: content }]);
    setCurrentMessage("");
    setLoading(true); // 开始加载
    setIsTalking(true);

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
        setLoading(false); // 加载完成
        setIsTalking(false); // 结束聊天
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

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop(); // 停止识别
    } else {
      recognition?.start(); // 开始识别
      setIsListening(true); // 设置为正在识别
    }
  };

  const toggleInputMode = () => {
    setIsVoiceMode(!isVoiceMode); // 切换语音/键盘模式
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
        {loading && <ThinkingBubble />} {/* 显示 ThinkingBubble */}
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <Image
          src={isVoiceMode ? MicrophoneIcon : KeyboardIcon}
          alt="Toggle Input Mode"
          onClick={toggleInputMode}
          className="mr-4 cursor-pointer z-50"
        />

        {isVoiceMode ? (
          <button
            onMouseDown={toggleListening}
            onMouseUp={toggleListening}
            className="p-2 w-full bg-gray-200 border-2 border-gray-400 rounded-md"
          >
            按住 说话
          </button>
        ) : (
          <textarea
            ref={textareaRef}
            className="w-full text-sm text-black p-2 box-border border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        )}
        <Image
          src={PlayIcon}
          alt=""
          onClick={() => handleSendMessage()}
          className=" cursor-pointer z-50"
        />
      </div>
    </div>
  );
});

Chat.displayName = "Chat";

export default Chat;
