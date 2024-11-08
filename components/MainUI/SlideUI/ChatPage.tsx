import React, { useState } from "react";
import { WindowContent, TextInput, Button } from "react95";
import { 
  Page, 
  WindowWrapper, 
  FlexBox, 
  ChatContainer, 
  MessageBubble 
} from "./styles";
import { useNavHeight } from "@/components/Root/navHeightContext";

export default function ChatPage() {
  const { navHeight } = useNavHeight();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
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
        <WindowContent style={{ 
          height: '33%', 
          display: 'flex', 
          flexDirection: 'column',
          padding: 0,
        }}>
          <div className="grow flex flex-col gap-2 overflow-y-scroll">
            {messages.map((msg, index) => (
              <div key={index} className="nes-balloon from-right text-black">
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          
          <FlexBox style={{ 
            padding: '16px',
            borderTop: '2px solid #424242',
            marginTop: 'auto'
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
