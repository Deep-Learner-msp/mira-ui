import React, { useState } from "react";
import { Avatar } from "antd";
import { CopyOutlined, LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import TimeStamp from "./TimeStamp";

const BotResponse = ({ message, timestamp }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [showIcons, setShowIcons] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    alert("Message copied!");
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        alignSelf: "flex-start",
        position: "relative",
        alignItems: "baseline",
      }}
      onMouseEnter={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
    >
      <div style={{ height: "32px", width: "32px" }}>
        <Avatar src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/replicate-prediction-zvcxybjqt1rm20chek8asmwxt8-K19ZQkql8f2cRM4idKyBtaH3JMoNPV.webp" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "5px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              borderRadius: "12px 12px 12px 0px", // Updated border radius
              background: "#20A090",
              padding: "8px 13.5px",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              color: "#ffff",
            }}
          >
            {message}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              opacity: showIcons ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          >
            <CopyOutlined
              onClick={handleCopy}
              style={{ cursor: "pointer", marginRight: "5px" }}
            />
            <LikeOutlined
              onClick={handleLike}
              style={{ cursor: "pointer", marginRight: "5px" }}
            />
            <DislikeOutlined
              onClick={handleDislike}
              style={{ cursor: "pointer", marginRight: "5px" }}
            />
          </div>
        </div>
        <div style={{ fontSize: "12px", color: "#888" }}>
          <TimeStamp timeStamp={timestamp} />
        </div>
      </div>
    </div>
  );
};

export default BotResponse;
