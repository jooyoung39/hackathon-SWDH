import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

import "../assets/style/modal.css";

const HealthCareModal = ({ show, onClose, props }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal
      show={isOpen && show}
      onHide={() => {
        setIsOpen(false);
        onClose();
      }}
      centered
    >
      <Modal.Header style={{ borderBottom: "0" }}>
        <CloseButton
          onClick={() => {
            setIsOpen(false);
            onClose();
          }}
        />
      </Modal.Header>
      {show && (
        <Modal.Body style={{ marginTop: "-1rem", paddingTop: "1rem" }}>
          건강 공제 조회
          <div>{props.data.registered ? "가입" : "미가입"}</div>
        </Modal.Body>
      )}
    </Modal>
  );
};

export default HealthCareModal;
