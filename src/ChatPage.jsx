import React, { useState, useEffect } from "react";
import { Space, Spin } from "antd";
import Conversation from "./components/Conversation";
import QuestionInput from "./components/QuestionInput";
import mira from "./api-consumer";
import UserInput from "./components/UserInput";
import ProcessQuestionStatus from "./components/ProcessQuestionStatus";

const SessionPage = ({ sessionId, messageId, _messageId }) => {
  const [loading, _loading] = useState(false);
  const [convObj, _convObj] = useState(null);
  const [statusMessage, _statusMessage] = useState(null);
  const [inputDisabled, _inputDisabled] = useState(false);
  const [failed, _failed] = useState(false);
  const [questionInput, _questionInput] = useState("");
  const [messages, _messages] = useState([]);
  const readFromObj = (con) => {
    _messages(con.getMessages());
    _loading(con.isLoading);
    _statusMessage(con.statusMessage);
  };

  const submitQuestion = async (question) => {
    _inputDisabled(true);
    _failed(false);
    _questionInput(question);
    convObj
      .processQuestion(question)
      .then(() => {
        _questionInput(null);
        _inputDisabled(false);
      })
      .catch(() => {
        _failed(true);
        _inputDisabled(false);
      });
  };

  useEffect(() => {
    const con = mira.createConvObj(sessionId);
    _convObj(con);
    readFromObj(con);
    con.events.addEventListener("conversation", () => {
      readFromObj(con);
    });
  }, [sessionId]);

  const draftMessage = questionInput ? (
    <UserInput message={questionInput} isLoading={true} hasFailed={failed} />
  ) : null;

  const noMessages = messages.length == 0 && (
    <Spin spinning={true} size="medium" fullscreen={true} />
  );

  return (
    <div style={{ backgroundColor: "rgb(240, 248, 255)" }}>
      <div style={{ height: "calc(-53px + 100vh)" }}>
        <div
          style={{
            maxWidth: "10000px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              marginBottom: "10px",
              padding: "5px",
            }}
          >
            <Conversation
              messages={messages}
              messageId={messageId}
              _messageId={_messageId}
              submitQuestion={submitQuestion}
              conversationObj={convObj}
            >
              {noMessages}
              {!noMessages && draftMessage}
              {!noMessages && loading && (
                <ProcessQuestionStatus message={statusMessage} />
              )}
            </Conversation>
          </div>
          <div>
            <Space.Compact
              style={{
                width: "100%",
              }}
            >
              <QuestionInput
                onSubmit={submitQuestion}
                inputDisabled={loading == true}
              />
            </Space.Compact>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatPage = ({ sessionId, _sessionId, messageId, _messageId }) => {
  const [loading, _loading] = useState(false);
  const isWelcome = sessionId === "";
  const [inputDisabled, _inputDisabled] = useState(false);
  const [failed, _failed] = useState(false);

  const createSession = async (question) => {
    _loading(true);
    mira
      .createSession(question)
      .then((newSessionId) => {
        _sessionId(newSessionId);
        _loading(false);
      })
      .catch((error) => {
        _loading(false);
        console.log(error);
      });
  };

  return isWelcome ? (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        flexDirection: "column",
        display: "flex",
        padding: "10px",
        backgroundColor: "rgb(240, 248, 255)", // Light blue background
        color: "#333", // Dark text color
        textAlign: "center",
      }}
    >
      <div
        style={{
          padding: "20px",
          overflow: "auto",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "#007acc", fontSize: "2.5em", fontWeight: "bold" }}>
          Welcome to Mira Chat
        </h1>
        <p style={{ fontStyle: "italic", fontSize: "1.2em" }}>
          "The ocean stirs the heart, inspires the imagination, and brings
          eternal joy to the soul." - Wyland
        </p>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/replicate-prediction-zvcxybjqt1rm20chek8asmwxt8-K19ZQkql8f2cRM4idKyBtaH3JMoNPV.webp"
          alt="Ocean"
          preview={false}
          style={{
            width: "300px", // Set width to a fixed value
            height: "300px", // Set height to the same fixed value
            objectFit: "cover",
            borderRadius: "50%", // Make the image round
            margin: "20px auto", // Center the image horizontally
            display: "block", // Ensure the image is treated as a block element
          }}
        />
      </div>
      <Space.Compact
        style={{
          width: "100%",
        }}
      >
        <QuestionInput
          onSubmit={createSession}
          inputDisabled={loading == true}
        />
      </Space.Compact>
    </div>
  ) : (
    <SessionPage
      sessionId={sessionId}
      messageId={messageId}
      _messageId={_messageId}
    />
  );
};

export default ChatPage;
