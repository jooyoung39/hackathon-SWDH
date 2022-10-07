import { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Card from "react-bootstrap/Card";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

const icon = {
  tablets: "fa-tablets",
  capsules: "fa-capsules",
  vial: "fa-vial",
  patch: "fa-note-medical",
};

const MedicineModal = ({ show, onClose, props }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [reserveCount, setReserveCount] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const target = useRef(null);
  console.log("MM", props);

  const hideModal = () => {
    setIsOpen(false);
    onClose();
  };

  const reserveUp = () => {
    if (reserveCount < 2 && reserveCount < props.quantity) {
      setReserveCount(reserveCount + 1);
      setIsInvalid(false);
    } else {
      setErrorMessage("예약은 2개 혹은 남은 개수를 넘을 수 없습니다.");
      setIsInvalid(true);
    }
  };

  const reserveDown = () => {
    if (reserveCount > 1) {
      setReserveCount(reserveCount - 1);
      setIsInvalid(false);
    } else {
      setErrorMessage("0개 이하로 예약할 수 없습니다.");
      setIsInvalid(true);
    }
  };

  return (
    <Modal show={isOpen && show} onHide={hideModal} centered>
      <Modal.Header style={{ borderBottom: "0" }}>
        <CloseButton onClick={hideModal} />
      </Modal.Header>
      {show && (
        <>
          <Modal.Body style={{ marginTop: "-1rem", paddingTop: "1rem", textAlign: "center" }}>
            <Card className="card-medicine">
              <Card.Body>
                <h5 className="mb-0 text-center w-100">
                  <i className={["fa-solid me-3", icon[props.icon]].join(" ")}></i>
                  {props.name}
                </h5>
              </Card.Body>
            </Card>
            <Card className="card-medicine">
              <Card.Body style={{ flexDirection: "column" }}>
                <h5>효능</h5>
                <p>{props.effect}</p>
              </Card.Body>
            </Card>
            <Card className="card-medicine">
              <Card.Body style={{ flexDirection: "column" }}>
                <h5>복용량</h5>
                <p>{props.dosage}</p>
              </Card.Body>
            </Card>
            <Card className="card-medicine">
              <Card.Body style={{ flexDirection: "column" }}>
                <h5>성분</h5>
                <p>{props.ingredient}</p>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "space-between" }}>
            <p>남은 개수: {props.quantity}</p>
            <p ref={target}>
              <Button variant="outline-secondary me-3" onClick={reserveDown}>
                <i className="fa-solid fa-angle-down"></i>
              </Button>
              {reserveCount}
              <Button variant="outline-secondary ms-3" onClick={reserveUp}>
                <i className="fa-solid fa-angle-up"></i>
              </Button>
            </p>
            <Overlay target={target.current} show={isInvalid} placement="top">
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  {errorMessage}
                </Tooltip>
              )}
            </Overlay>
            <Button>예약하기</Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default MedicineModal;
