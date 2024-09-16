import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Spin, Result } from "antd";

import ChatPage from "./ChatPage";
import "./ChatPage.scss";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import mira from "./api-consumer";

const { Sider, Content } = Layout;

const MiraChat = () => {
  const [sessionId, _sessionId] = useState("");
  const [messgeId, _messgeId] = useState("");
  const [userData, _userData] = useState("");
  const [userDataLoading, _userDataLoading] = useState(false);
  const [errorData, _errorData] = useState("");
  const [sessionList, _sessionList] = useState([]);
  const [sessionListLoading, _sessionListLoading] = useState(false);

  const updateSessionList = () => {
    _sessionListLoading(true);
    mira
      .getAllSessions()
      .then((d) => {
        _sessionList(d);
        _sessionListLoading(false);
        try {
          const lastSessionId = localStorage.getItem("sessionId");
          if (lastSessionId) {
            if (d.find((p) => p.sessionId == lastSessionId)) {
              _sessionId(lastSessionId);
            }
          }
        } catch (e) {
          console.log(e);
        }
      })
      .catch((e) => {
        _sessionListLoading(false);
        console.log(e);
      });
  };

  useEffect(() => {
    localStorage.setItem("sessionId", sessionId);
  }, [sessionId]);

  useEffect(() => {
    updateSessionList();
    mira.events.addEventListener("session", () => {
      updateSessionList();
    });
  }, []);

  if (userDataLoading) {
    return (
      <div className="app">
        <Header />
        <Spin fullscreen={true} />
      </div>
    );
  } else if (errorData) {
    return (
      <div className="app">
        <Header />
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
        />
      </div>
    );
  } else {
    return (
      <div className="app">
        <Layout style={{ flexDirection: "column" }}>
          <Header userData={userData} />
          <div className="chat-page">
            <Sidebar
              sessionId={sessionId}
              _sessionId={_sessionId}
              messgeId={messgeId}
              _messgeId={_messgeId}
              sessionList={sessionList}
              sessionListLoading={sessionListLoading}
            />
            <Layout style={{ height: "calc(100vh - 53px)", display: "flex" }}>
              <ChatPage
                sessionId={sessionId}
                _sessionId={_sessionId}
                messgeId={messgeId}
                _messgeId={_messgeId}
              />
            </Layout>
          </div>
        </Layout>
      </div>
    );
  }
};

export default MiraChat;
