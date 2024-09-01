import { Avatar, Image } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

const Header = ({ userData }) => {
  return (
    <div
      style={{
        height: "50px",
        background: "linear-gradient(90deg, #0496C7, #00C6FF)",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/replicate-prediction-zvcxybjqt1rm20chek8asmwxt8-K19ZQkql8f2cRM4idKyBtaH3JMoNPV.webp"
          alt="Mira Logo"
          width={35}
          height={35}
          className="rounded-full"
          preview={false}
          style={{
            cursor: "pointer",
            height: "35px",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <h1
          style={{
            marginLeft: "15px",
            background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "24px",
            fontFamily: "'Pacifico', cursive",
            color: "#fff",
          }}
        >
          Mira Chat
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: "20px",
        }}
      >
        <span style={{ color: "#fff", fontSize: "16px" }}>Hi, user</span>
        <Avatar
          icon={<UserOutlined />}
          style={{
            cursor: "pointer",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
    </div>
  );
};

export default Header;
