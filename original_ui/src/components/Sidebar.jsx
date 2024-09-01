import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Spin } from "antd"; // Import Spin for loader
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  AppstoreOutlined, // New icon for sessions
} from "@ant-design/icons";

const { Sider, Content } = Layout;
const Sidebar = ({
  sessionId,
  _sessionId,
  sessionList,
  sessionListLoading,
}) => {
  const [collapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    return savedState ? JSON.parse(savedState) : false;
  });

  // Save the collapsed state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleSessionClick = (id) => {
    _sessionId(id);
  };

  return (
    <div style={{ backgroundColor: "rgb(240, 248, 255)" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={62}
        width={250} // Increased width from 200 to 250
        style={{
          overflow: "hidden",
          background: " rgb(240, 248, 255)", // Gradient background
          height: "calc(100vh - 50px)",
          minWidth: "48px",
          transition: "all 0.3s ease", // Smooth transition for collapse/expand
        }}
      >
        <div
          style={{
            margin: "10px",
            height: "48px",
            width: "48px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            position: "relative",
            borderRadius: "10px",
            zIndex: 10,
            transition: "all 0.3s ease", // Smooth transition for button area
          }}
        >
          <Button
            type="primary"
            onClick={toggle}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#ffffff",
              boxShadow: "none",
              color: "#000",
              display: "flex",
              justifyContent: "center",
              transition: "all 0.3s ease",
              border: "2px solid #d9d9d9", // Changed border to 1px
              // Smooth transition for button
            }}
          />
        </div>
        {!collapsed && (
          <div>
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[sessionId]}
              style={{
                height: "100vh",
                border: "2px solid #d9d9d9",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
              }} // Updated border style with border radius
            >
              {" "}
              {/* Light theme for the menu */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  backgroundColor: "#f0f2f5",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px", // Increase font size
                    color: "#000000", // Change text color to black
                    // Removed fontFamily and letterSpacing to revert to original font
                  }}
                >
                  Sessions
                </span>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="small"
                  style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
                  onClick={() => _sessionId("")}
                >
                  New
                </Button>
              </div>
              {sessionListLoading ? (
                <Spin style={{ margin: "20px auto" }} /> // Loader component
              ) : (
                <Menu.ItemGroup>
                  {sessionList.map((session) => (
                    <Menu.Item
                      key={session.sessionId}
                      icon={<AppstoreOutlined />}
                      onClick={() => handleSessionClick(session.sessionId)}
                    >
                      {session.label}
                    </Menu.Item>
                  ))}
                </Menu.ItemGroup>
              )}
            </Menu>
          </div>
        )}
      </Sider>
    </div>
  );
};

export default Sidebar;
