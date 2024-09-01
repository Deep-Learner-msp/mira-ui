import React, { useState } from "react";
import { Card, Input, Typography, Image } from "antd"; // Ensure Image is imported from antd
import { SendOutlined } from "@ant-design/icons"; // Import additional icons
import { FaWater } from "react-icons/fa"; // Import the water icon

const { TextArea } = Input;
const { Text } = Typography;

const QuestionInput = ({ onSubmit, inputDisabled }) => {
  console.log(inputDisabled);
  const [inputValue, _inputValue] = useState("");
  const [emptyInput, _emptyInput] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      onClick(e);
    }
  };

  const onClick = (e) => {
    if (!inputDisabled) {
      if (inputValue !== "") {
        e.preventDefault();
        onSubmit(inputValue);
        _inputValue("");
      } else {
        _emptyInput(true);
        setTimeout(() => {
          _emptyInput(false);
        }, 3000);
      }
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {" "}
      {/* Increased padding for the container */}
      <Card
        style={{
          width: "100%",
          borderRadius: "8px", // Set border radius for the card
          border: `2px solid ${isHovered ? "#a6ccf4" : "#d3d3d3"}`, // Change border color on hover
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9", // Light grey background for the card
          transition: "border-color 0.3s",
          padding: "10px", // Increased padding for the card
        }}
        bodyStyle={{
          padding: "0",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
        }} // Set a lighter background color for the card body and border radius
        hoverable
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/replicate-prediction-zvcxybjqt1rm20chek8asmwxt8-K19ZQkql8f2cRM4idKyBtaH3JMoNPV.webp"
            preview={false}
            style={{
              height: "24px", // Increased image size
              width: "24px",
              margin: "0 5px",
              borderRadius: "50%",
            }}
          />
          <TextArea
            disabled={inputDisabled}
            onChange={(e) => {
              _inputValue(e.target.value.trimStart());
            }}
            value={inputValue}
            onKeyDown={handleEnterPress}
            style={{
              flex: 1,
              border: "none",
              padding: "4px",
              fontWeight: "400",
              resize: "none",
              borderColor: "transparent",
            }}
            rows={2}
            placeholder="How are you feeling today? Share your thoughts...."
            onFocus={(e) => {
              e.target.style.borderColor = "transparent";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "transparent";
            }}
          />
          <div
            style={{ display: "flex", alignItems: "center", marginLeft: "5px" }}
          >
            <SendOutlined
              style={{ fontSize: "18px", color: "#00796b", cursor: "pointer" }}
              onClick={onClick} // Slightly larger send icon
            />
          </div>
        </div>

        {/* Fancy Divider */}
        <div
          style={{
            height: "1px", // Reduced thickness of the divider
            background: "#00796b", // Divider color
            margin: "5px 0",
            borderRadius: "1px",
          }}
        />

        <div
          style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
        >
          <FaWater
            style={{ fontSize: "14px", color: "#00796b", margin: "0 5px" }} // Slightly larger icon
          />{" "}
          {/* Exciting icon */}
          <Text
            style={{
              fontSize: "12px",
              color: "#00796b",
              fontStyle: "italic",
              marginLeft: "5px",
            }}
          >
            Your mental health is a priority. Your happiness is essential.
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default QuestionInput;
