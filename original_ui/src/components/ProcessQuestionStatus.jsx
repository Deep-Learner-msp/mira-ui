import { Spin } from "antd";
import React from "react";

const ProcessQuestionStatus = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        color: "#242424",
        fontSize: "14px",
        fontWeight: "300",
        lineHeight: "normal",
      }}
    >
      <Spin size="small" style={{ margin: "5px" }} />
      {message}
    </div>
  );
};

export default ProcessQuestionStatus;
