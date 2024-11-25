import React, { useState, useEffect } from "react";
import { WindowContent, TextInput, Button } from "react95";
import { Page, WindowWrapper, FlexBox } from "./styles";
import { useNavHeight } from "@/components/Root/navHeightContext";
import { extractKeywords, findRelatedEmojis } from "@/utils/emojiUtils";
import { authApis } from "@/app/normalApi";
import ChatLoadingDots from "../chatLoadingDot";

export default function ChatPage({
  loading,
  setLoading,
  fetchUserData,
  setEmojisContent,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchUserData: () => void;
  setEmojisContent: (emojisContent: string) => void;
}) {
  const { navHeight } = useNavHeight();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "🐶 🐶 🥰 Hi!", isMe: false },
  ]);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const handleSend = async (voiceText?: string) => {
    // 使用 voiceText 或 message
    const textToSend = voiceText || message;
    
    if (textToSend.trim()) {
      const newMessages = [...messages, { text: textToSend, isMe: true }];
      setMessages(newMessages);
      localStorage.setItem("chatMessages", JSON.stringify(newMessages));
      setMessage("");

      try {
        setLoading(true);
        const response = await authApis.getReply(textToSend); 
        let replyEmojis = response.data.data.emojis;
        let replyText = response.data.data.response;

        if (!replyEmojis) {
          const keywords = extractKeywords(message);
          const localEmojis = await findRelatedEmojis(keywords);
          replyEmojis = localEmojis.join(" ");
        }

        setLoading(false);
        setEmojisContent(replyEmojis);
        const updatedMessages = [
          ...newMessages,
          { text: replyText, isMe: false },
        ];
        setMessages(updatedMessages);
        localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));

        fetchUserData();
      } catch (error) {
        // console.error('发送消息失败:', error);
        const keywords = extractKeywords(textToSend);
        const localEmojis = await findRelatedEmojis(keywords);
        const replyEmojis = localEmojis.join(" ");

        setLoading(false);
        setEmojisContent(replyEmojis);
        const updatedMessages = [
          ...newMessages,
          {
            text: "Sorry, I'm just a doggie, I don't understand.",
            isMe: false,
          },
        ];
        setMessages(updatedMessages);
        localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
      }
    }
  };

  return (
    <Page $navHeight={navHeight}>
      <WindowWrapper>
        <WindowContent
          style={{
            height: 288,
            display: "flex",
            flexDirection: "column",
            padding: 0,
            paddingBottom: 20,
            paddingTop: 8,
          }}
        >
          <div
            className="grow flex flex-col gap-3 overflow-y-scroll text-black text-lg px-4"
            ref={(el) => {
              if (el) {
                el.scrollTop = el.scrollHeight;
              }
            }}
          >
            {messages.map((msg, index) =>
              msg.isMe ? (
                <div
                  key={index}
                  className="nes-container is-rounded with-title bg-white"
                >
                  <p className="title">Me</p>
                  <p>{msg.text}</p>
                </div>
              ) : (
                <div
                  key={index}
                  className="nes-container is-rounded with-title bg-white"
                >
                  <p className="title">Punky</p>
                  <p>{msg.text}</p>
                </div>
              )
            )}
            {loading && <ChatLoadingDots />}
          </div>

          <FlexBox
            style={{
              padding: "8px",
              borderTop: "2px solid #424242",
              marginTop: "auto",
            }}
          >
            <input
              type="text"
              className="nes-input grow text-black"
              value={message}
              placeholder="Chat..."
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="button"
              className="nes-btn is-success"
              onClick={() => handleSend()} // 修改这里
            >
              Send
            </button>
            <VoiceInput 
              onTranscript={(text) => {
                setMessage(text);  // 更新输入框的文本
              }}
              onStop={(text) => {
                handleSend(text);  // 传入当前的语音文本
              }}
            />
          </FlexBox>
        </WindowContent>
      </WindowWrapper>
    </Page>
  );
}
