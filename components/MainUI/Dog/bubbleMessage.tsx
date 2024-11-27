import React from "react";

interface BubbleMessageProps {
  message: string;
}

const BubbleMessage: React.FC<BubbleMessageProps> = ({ message }) => {
  return (
    <section className="message-list">
      <section className="message -left">
        <div className="nes-balloon from-left px-6 py-4 text-xl">{message}</div>
      </section>
    </section>
  );
};

export default BubbleMessage;
