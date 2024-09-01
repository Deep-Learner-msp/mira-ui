import React from "react";
import UserInput from "./UserInput";
import BotResponse from "./BotResponse";

const Conversation = ({
  messages,
  children,
  messageId,
  _messageId,
  submitQuestion,
  conversationObj,
}) => {
  if (messages && messages.length == 0) {
    return (
      <div
        style={{
          whiteSpace: "pre-wrap",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "auto",
          scrollbarWidth: "none",
        }}
      >
        {children}
      </div>
    );
  } else {
    const messeges =
      messages &&
      messages.map((d, i) => {
        if (d.profile === "user") {
          return (
            <UserInput
              key={d.messageId}
              message={d.message}
              timestamp={d.time}
            />
          );
        } else {
          return (
            <BotResponse
              key={d.messageId}
              message={d.message}
              timestamp={d.time}
            />
          );
        }
      });
    return (
      <>
        <div
          style={{
            whiteSpace: "pre-wrap",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "auto",
          }}
        >
          {messeges}
          {children}
        </div>
      </>
    );
  }
};

export default Conversation;
