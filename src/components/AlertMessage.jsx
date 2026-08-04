import React from "react";


const AlertMessage = ({ type, message }) => {
  let bgColor;
  let textColor;
  let borderLeftColor;

  switch (type) {
    case "error":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      borderLeftColor = "border-l-4 border-red-600";
      break;
    case "success":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      borderLeftColor = "border-l-4 border-green-600";
      break;
    case "loading":
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
      borderLeftColor = "border-l-4 border-blue-600";
      break;
    default:
      icon = null;
      bgColor = "";
      textColor = "";
      borderLeftColor = "";
  }

  return (
    <div
      className={`flex items-center p-4 rounded-lg shadow-md ${bgColor} ${textColor} ${borderLeftColor} space-x-3`}
    >
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default AlertMessage;