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

  const handleSend = async () => {
    if (message.trim()) {
      const newMessages = [...messages, { text: message, isMe: true }];
      setMessages(newMessages);
      localStorage.setItem("chatMessages", JSON.stringify(newMessages));
      setMessage("");

      try {
        setLoading(true);
        const response = await authApis.getReply(message);
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
        console.error("Send message error:", error);
        const keywords = extractKeywords(message);
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
              className="nes-btn bg-black text-white"
              onClick={handleSend}
            >
              Send
            </button>
          </FlexBox>
        </WindowContent>
      </WindowWrapper>
    </Page>
  );
}
