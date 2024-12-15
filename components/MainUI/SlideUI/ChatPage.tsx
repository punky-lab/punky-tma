import React, { useEffect } from "react";
import { WindowContent } from "react95";
import { Page, WindowWrapper, FlexBox } from "./styles";
import { useNavHeight } from "@/components/Root/navHeightContext";
import { extractKeywords, findRelatedEmojis } from "@/utils/emojiUtils";
import ChatLoadingDots from "../chatLoadingDot";
import VoiceInput from "../voicechat";
import { callOpenRouterAPI, separateEmojisAndText } from "@/utils/reply";

export default function ChatPage({
  loading,
  setLoading,
  fetchUserData,
  setEmojisContent,
  messages,
  setMessages,
  message,
  setMessage,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchUserData: () => void;
  setEmojisContent: (emojisContent: string) => void;
  messages: any[];
  setMessages: (messages: any[]) => void;
  message: string;
  setMessage: (message: string) => void;
}) {
  const { navHeight } = useNavHeight();

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const handleSend = async (voiceText?: string) => {
    // 使用 voiceText 或 message
    const textToSend = voiceText || message;

    console.log("handleSend", textToSend);

    if (textToSend.trim()) {
      const newMessages = [...messages, { text: textToSend, isMe: true }];
      setMessages(newMessages);
      localStorage.setItem("chatMessages", JSON.stringify(newMessages));
      setMessage("");

      try {
        setLoading(true);
        const raw_reply = await callOpenRouterAPI(textToSend);
        const { reply_text, reply_emojis } = separateEmojisAndText(raw_reply);
        setLoading(false);
        setEmojisContent(reply_emojis.join(" "));

        setTimeout(() => {
          setEmojisContent("");
        }, 5000);

        const updatedMessages = [
          ...newMessages,
          {
            text: reply_text,
            // text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
            isMe: false,
          },
        ];
        setMessages(updatedMessages);
        localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));

        fetchUserData();
      } catch (error) {
        console.error("发送消息失败:", error);
        const keywords = extractKeywords(textToSend);
        const localEmojis = await findRelatedEmojis(keywords);
        const replyEmojis = localEmojis.join(" ");

        setLoading(false);
        setEmojisContent(replyEmojis);

        setTimeout(() => {
          setEmojisContent("");
        }, 5000);
      }
    }
  };

  return (
    <Page $navHeight={navHeight}>
      <WindowWrapper
        style={{
          borderColor: "#33E3FF",
        }}
      >
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
                <div key={index} className="flex justify-end  border-[#33E3FF]">
                  <div className="nes-container w-[80%] p-4 border-[#33E3FF]  with-title bg-[#d9d9d9]/65 ">
                    {/* <p className="title">Me</p> */}
                    <p className="text-white">{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="flex justify-start  border-[#33E3FF]"
                >
                  <div className="nes-container w-[80%] p-4  border-[#33E3FF] with-title bg-[#d9d9d9]/65 ">
                    {/* <p className="title">Punky</p> */}
                    <p className="text-white">{msg.text}</p>
                  </div>
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
              position: "relative",
            }}
          >
            <input
              type="text"
              className="nes-input grow text-black bg-[#dcdcdc] pr-[100px] placeholder:bg-[#dcdcdc] "
              value={message}
              placeholder="Chat..."
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="absolute right-0 flex justify-center item-center">
              <VoiceInput
                onTranscript={(text) => {
                  console.log("transcript text", text);
                  setMessage(text); // 更新输入框的文本
                }}
                onStop={(text) => {
                  console.log("transcript stop");
                  handleSend(text); // 传入当前的语音文本
                }}
              />
              <button
                type="button"
                className="nes-btn bg-black text-white "
                onClick={() => handleSend()} // 修改这里
              >
                Send
              </button>
            </div>
          </FlexBox>
        </WindowContent>
      </WindowWrapper>
    </Page>
  );
}
