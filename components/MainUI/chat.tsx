"use client";

import Image from "next/image";
import PlayIcon from "@/assets/icons/toMessage.svg";
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
import { getChatResponse, getResponse } from "@/app/api/chat";
import ThinkingBubble from "@/components/thinkingBubble"; // 引入 ThinkingBubble
import LoadingDots from "./loadingDots";

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
  const [isListening, setIsListening] = useState(false); // 语音识别状态
  const [isRecording, setIsRecording] = useState(false); // 是否正在录音
  const [recordStartPos, setRecordStartPos] = useState({ x: 0, y: 0 }); // 记录录音开始的触摸位置
  const [recordStatus, setRecordStatus] = useState(""); // 用于显示录音状态提示（上滑取消，右滑转文字等）
  const [recordTime, setRecordTime] = useState(0); // 录音时间
  const recordTimerRef = useRef<NodeJS.Timeout | null>(null); // 用于记录录音时长的计时器
  const recognition = useRef<any>(null); // 语音识别实例

  const handleSendMessage = (message?: string) => {
    if (currentMessage.trim() === "" && !message) {
      return;
    }
    const content = message?.trim() ?? currentMessage.trim();
    setMessages([
      ...messages,
      { role: "user", content: content },
      { role: "ai", content: "", type: "loading" },
    ]);
    setCurrentMessage("");
    setLoading(true); // 开始加载
    setIsTalking(true);

    getResponse(content)
      .then((reply) => {
        setMessages((prevMessages) => {
          prevMessages[prevMessages.length - 1].role = "ai";
          prevMessages[prevMessages.length - 1].content = reply;
          prevMessages[prevMessages.length - 1].type = "ai";
          return prevMessages;
        });
      })
      .catch((error) => {
        setMessages((prevMessages) => {
          prevMessages[prevMessages.length - 1].role = "system";
          prevMessages[prevMessages.length - 1].content = `ERROR: ${error}`;
          prevMessages[prevMessages.length - 1].type = "system";
          return prevMessages;
        });
        // setMessages(messages);
      })
      .finally(() => {
        setLoading(false); // 加载完成
        setIsTalking(false); // 结束聊天
      });
  };

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;

      recognition.current.onresult = (event: {
        results: { transcript: any }[][];
      }) => {
        const transcript = event.results[0][0].transcript;
        handleSendMessage(transcript); // 识别到的文本发送出去
      };

      recognition.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const startRecording = (e: any) => {
    setIsRecording(true);
    setRecordStartPos({ x: e.nativeEvent.clientX, y: e.nativeEvent.clientY }); // 记录触摸位置
    setRecordStatus("上滑取消，右滑转文字"); // 提示用户操作

    // 开始计时
    recordTimerRef.current = setInterval(() => {
      setRecordTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordStatus("");
    clearInterval(recordTimerRef.current as NodeJS.Timeout);
    setRecordTime(0);
  };

  const handleTouchMove = (e: any) => {
    const currentX = e.nativeEvent.clientX;
    const currentY = e.nativeEvent.clientY;
    const deltaX = currentX - recordStartPos.x;
    const deltaY = currentY - recordStartPos.y;

    // 判断用户是否向左上滑动，取消录音
    if (deltaY < -50 && deltaX < -50) {
      setRecordStatus("松开手指，取消录音");
    }
    // 判断用户是否向右上滑动，转语音为文字
    else if (deltaY < -50 && deltaX > 50) {
      setRecordStatus("松开手指，转为文字");
    } else {
      setRecordStatus("上滑取消，右滑转文字");
    }
  };

  const handleSendVoiceMessage = () => {
    // 这里处理发送语音消息的逻辑
    console.log("发送语音消息...");
  };

  const handleTouchEnd = (e: any) => {
    const currentX = e.nativeEvent.clientX;
    const currentY = e.nativeEvent.clientY;
    const deltaX = currentX - recordStartPos.x;
    const deltaY = currentY - recordStartPos.y;

    // 判断松开时的最终操作
    if (deltaY < -50 && deltaX < -50) {
      // 取消录音
      setIsRecording(false);
      setRecordStatus("录音已取消");
      clearInterval(recordTimerRef.current as NodeJS.Timeout);
      setRecordTime(0);
    } else if (deltaY < -50 && deltaX > 50) {
      // 转语音为文字
      setRecordStatus("正在转文字...");
      stopRecording();
      const msg = recognition.current?.start(); // 开始语音转文字
      console.log(">>>>", msg);
    } else {
      stopRecording();
      handleSendVoiceMessage();
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

  const toggleInputMode = () => {
    setIsVoiceMode(!isVoiceMode); // 切换语音/键盘模式
  };

  return (
    <div className="relative w-full">
      <div
        ref={messageListRef}
        className="absolute min-h-60 -translate-y-full w-full h-full overflow-y-auto"
      >
        {messages.map((message, index) => {
          if (
            message.content !== "I just feed" &&
            message.content !== "I just treat" &&
            message.content !== "I just play with toy"
          ) {
            return <Message message={message} key={index} />;
          }
          return;
        })}
      </div>
      {isRecording && (
        <div className="flex justify-center mt-4 z-99">
          <div className="bg-gray-800 text-white p-2 rounded-md">
            {recordStatus}
          </div>
        </div>
      )}

      {/* 录音时间显示 */}
      {isRecording && (
        <div className="flex justify-center mb-4">
          <div className="bg-gray-800 text-white p-2 rounded-md">
            录音时长: {recordTime} 秒
          </div>
        </div>
      )}

      <div className="w-full flex flex-row justify-between items-center">
        {/* <Image
          src={isVoiceMode ? MicrophoneIcon : KeyboardIcon}
          alt="Toggle Input Mode"
          // onClick={toggleInputMode}
          className="mr-4 cursor-pointer z-50"
        /> */}
        {isVoiceMode ? (
          <div className="relative w-full">
            <div className="flex justify-center items-center">
              <button
                onTouchStart={startRecording}
                onTouchEnd={(e) => {
                  console.log("eee", e);
                  stopRecording();
                }}
                onTouchMove={handleTouchMove}
                onMouseDown={startRecording}
                onMouseUp={handleTouchEnd}
                className={`p-4 rounded-full w-full ${isRecording ? "bg-red-500" : "bg-gray-300"
                  }`}
              >
                {isRecording ? "松开 结束" : "按住 说话"}
              </button>
            </div>
          </div>
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
