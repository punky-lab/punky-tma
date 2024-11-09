import React, { useState } from "react";
import { WindowContent, TextInput, Button } from "react95";
import {
  Page,
  WindowWrapper,
  FlexBox,
  ChatContainer,
  MessageBubble,
} from "./styles";
import { useNavHeight } from "@/components/Root/navHeightContext";

export default function ChatPage() {
  const { navHeight } = useNavHeight();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "🐶🐶🥰Hi!", isMe: false },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, isMe: true }]);
      setMessage("");
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
