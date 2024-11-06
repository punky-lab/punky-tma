import React, { useState } from "react";
import styled from "styled-components";
import { Window, WindowHeader, WindowContent, TextInput, Button } from "react95";


const ChatContainer = styled.div`
  height: 400px;
  overflow-y: auto;
  margin-bottom: 10px;
  border: 2px inset #fff;
  padding: 8px;
`;

const MessageBubble = styled.div<{ isMe?: boolean }>`
  background: ${props => props.isMe ? '#c3c7cb' : '#fff'};
  padding: 8px;
  margin: 4px;
  max-width: 70%;
  ${props => props.isMe ? 'margin-left: auto;' : 'margin-right: auto;'}
  border: 1px solid #424242;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 8px;
`;
export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "你好！", isMe: false },
    { text: "Hi!", isMe: true },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, isMe: true }]);
      setMessage("");
    }
  };

  return (
    <Window className="window" style={{ width: "100%" }}>
      <WindowHeader>Chat</WindowHeader>
      <WindowContent>
        <ChatContainer>
          {messages.map((msg, index) => (
            <MessageBubble key={index} isMe={msg.isMe}>
              {msg.text}
            </MessageBubble>
          ))}
        </ChatContainer>
        
        <InputContainer>
          <TextInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="输入消息..."
            fullWidth
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend}>发送</Button>
        </InputContainer>
      </WindowContent>
    </Window>
  );
}
