import React from "react";

const TimeStamp = ({ timeStamp }) => {
  var localDate = new Date(timeStamp);

  const formatDate = localDate.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <div
      style={{
        fontSize: "9px",
        color: "#888",
        fontWeight: 400,
      }}
    >
      {formatDate}
    </div>
  );
};

export default TimeStamp;
