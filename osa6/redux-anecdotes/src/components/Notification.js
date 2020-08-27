import React from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  const dispatch = useDispatch();
  const notificationText = useSelector((state) => state.notification);

  return <div style={style}>{notificationText}</div>;
};

export default Notification;
