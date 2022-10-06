import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Card from "react-bootstrap/Card";

const MedicineModal = ({ show, onClose, props }) => {
  const [isOpen, setIsOpen] = useState(true);

  const hideModal = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Modal show={isOpen && show} onHide={hideModal} centered>
      <Modal.Header style={{ borderBottom: "0" }}>
        <CloseButton onClick={hideModal} />
      </Modal.Header>
      {show && (
        <Modal.Body style={{ marginTop: "-1rem", paddingTop: "1rem", textAlign: "center" }}>
          <Card className="card-medicine-name">
            <Card.Body>a</Card.Body>
          </Card>
          <Card className="card-medicine-info">
            <Card.Body></Card.Body>
          </Card>
        </Modal.Body>
      )}
    </Modal>
  );
};

export default MedicineModal;
