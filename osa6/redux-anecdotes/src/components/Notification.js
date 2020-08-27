import React from "react";
import { connect } from "react-redux";

const Notification = (props) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  const notificationText = props.notification;
  return (
    <>
      {notificationText.length > 0 && (
        <div style={style}>{notificationText}</div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification.notification,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
