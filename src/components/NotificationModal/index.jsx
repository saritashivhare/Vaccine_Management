import React, { useState, useEffect } from "react";
import { Modal } from "reactstrap";

export default function NotificationModal(props) {
  const [Notification, SetNotification] = useState(true);
  const NotificationClose = () => SetNotification(false);
  const NotificationShow = () => SetNotification(true);

  React.useEffect(() => {
    setTimeout(function () {
      NotificationClose();
    }, 5000);
  }, []);

  return (
    <Modal
      className="modal-dialog modal-danger"
      contentClassName={props.Class}
      isOpen={Notification}
      toggle={NotificationClose}
    >
      <div className="modal-header">
        <div className="mt-1 modal-title heading">{props.Msg}</div>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={NotificationClose}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
    </Modal>
  );
}
