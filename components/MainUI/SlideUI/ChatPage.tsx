import React, { useState } from "react";
import styled from "styled-components";
import { WindowHeader, WindowContent, TextInput, Button } from "react95";
import { Page, WindowWrapper, ContentWrapper } from "./styles";

const ChatContainer = styled.div`
  height: calc(100% - 60px);
  overflow-y: auto;
  padding: 8px;
  border: 2px inset #fff;
`;

const MessageBubble = styled.div<{ $isMe?: boolean }>`
  background: ${props => props.$isMe ? '#c3c7cb' : '#fff'};
  padding: 8px;
  margin: 4px;
  max-width: 70%;
  margin-left: ${props => props.$isMe ? 'auto' : '0'};
  border: 1px solid #424242;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

export default function ChatPage() {
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
    <Page>
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
          
          <InputContainer>
            <TextInput
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              style={{ flex: 1 }}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend}>Send</Button>
          </InputContainer>
        </WindowContent>
      </WindowWrapper>
    </Page>
  );
}
