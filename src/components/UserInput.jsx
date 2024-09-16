import React, { useState } from "react";
import { Avatar } from "antd";
import {
  UserOutlined,
  CopyOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import TimeStamp from "./TimeStamp";

const UserInput = ({ message, timestamp }) => {
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
        alignItems: "baseline",
        justifyContent: "flex-end",
        position: "relative",
        margin: "10px 10px 0px 0px",
      }}
      onMouseEnter={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "5px",
          alignItems: "end",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
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
          </div>
          <div
            style={{
              borderRadius: "12px 12px 0px 12px",
              border: "2px solid #ADD8E6", // Changed to light blue border
              padding: "8px 13.5px",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              color: "#000", // Changed text color to black for better contrast
            }}
          >
            {message}
          </div>
        </div>
        <div style={{ fontSize: "8px", color: "#888", alignSelf: "end" }}>
          <TimeStamp timeStamp={timestamp} />
        </div>
      </div>
      <div style={{ height: "32px", width: "32px" }}>
        <Avatar
          style={{ backgroundColor: "#52c41a" }} // Changed to "good" green color
          icon={<UserOutlined />}
        />
      </div>
    </div>
  );
};

export default UserInput;
