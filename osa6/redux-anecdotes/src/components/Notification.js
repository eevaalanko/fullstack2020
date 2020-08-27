import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  const notificationText = useSelector((state) => state.notification);
  return <>{notificationText.length > 0 && <div style={style}>{notificationText}</div>}</>;
};

export default Notification;
