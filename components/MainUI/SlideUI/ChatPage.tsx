import React, { useState } from "react";
import styled from "styled-components";
import { WindowHeader, WindowContent, TextInput, Button } from "react95";
import { Page, WindowWrapper, ContentWrapper } from "./styles";
import { useNavHeight } from "@/components/Root/navHeightContext";

const ChatContainer = styled.div`
  height: calc(100% - 60px);
  overflow-y: auto;
  padding: 8px;
  border: 2px solid #424242;
  box-shadow: 
    rgb(255, 255, 255) 2px 2px 0px 0px inset,
    rgb(0, 0, 0) -2px -2px 0px 0px inset;
  image-rendering: pixelated;
  background: #ffffff;
  
  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 16px;
  }
  
  &::-webkit-scrollbar-track {
    background: #c3c7cb;
    border: 2px solid #424242;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #dfdfdf;
    border: 2px solid #424242;
    &:hover {
      background: #c3c7cb;
    }
  }
`;

const MessageBubble = styled.div<{ $isMe?: boolean }>`
  background: ${props => props.$isMe ? '#c3c7cb' : '#fff'};
  padding: 8px;
  margin: 8px 4px;
  max-width: 70%;
  margin-left: ${props => props.$isMe ? 'auto' : '4px'};
  image-rendering: pixelated;
  
  /* 像素风格边框和阴影 */
  border: 2px solid #424242;
  box-shadow: ${props => props.$isMe 
    ? 'rgb(0, 0, 0) 2px 2px 0px 0px, rgb(255, 255, 255) -1px -1px 0px 0px inset'
    : 'rgb(0, 0, 0) 2px 2px 0px 0px, rgb(255, 255, 255) -1px -1px 0px 0px inset'
  };
  
  /* 添加像素风格的过渡效果 */
  transition: transform 0.2s steps(3);
  &:hover {
    transform: translate(-1px, -1px);
  }
  
  /* 可选：添加像素风格的尖角 */
  position: relative;
  &:before {
    content: '';
    position: absolute;
    ${props => props.$isMe ? 'right: -8px' : 'left: -8px'};
    top: 8px;
    width: 8px;
    height: 8px;
    background: ${props => props.$isMe ? '#c3c7cb' : '#fff'};
    border-right: 2px solid #424242;
    border-bottom: 2px solid #424242;
    transform: ${props => props.$isMe ? 'rotate(-45deg)' : 'rotate(135deg)'};
  }
`;

const FlexBox = styled.div`
  display: flex;
  gap: 8px;
`;

export default function ChatPage() {
  const { navHeight } = useNavHeight();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello!", isMe: false },
    { text: "Hi!", isMe: true },
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
        <WindowHeader>Chat</WindowHeader>
        <WindowContent>
          <ChatContainer>
            {messages.map((msg, index) => (
              <MessageBubble key={index} $isMe={msg.isMe}>
                {msg.text}
              </MessageBubble>
            ))}
          </ChatContainer>
          
          <FlexBox style={{ 
            marginTop: '16px',
            position: 'sticky',
            bottom: 0,
            padding: '16px 0',
            borderTop: '2px solid #424242'
          }}>
            <TextInput
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              style={{ flex: 1 }}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend}>Send</Button>
          </FlexBox>
        </WindowContent>
      </WindowWrapper>
    </Page>
  );
}
