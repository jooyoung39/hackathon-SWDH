import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import Collapse from "react-bootstrap/Collapse";

import MedicineCard from "./medicineCard";

import MedicineData from "../MedicineData.json";

import "../assets/style/modal.css";

const medicineData = MedicineData.medicines;

const ItemListModal = ({ show, onClose, props }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [open, setOpen] = useState(-1);
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
          {Array.isArray(props.type) && props.type.length !== 0 ? (
            medicineData.map(
              (medicine) =>
                props.type.some((type) => {
                  return type === medicine.type;
                }) && (
                  <div key={medicine.id}>
                    <MedicineCard medicine={medicine} onClick={() => setOpen(medicine.id === open ? -1 : medicine.id)} />
                    <Collapse in={open === medicine.id}>
                      <div>
                        <Card className="card-long">
                          <Card.Body>
                            <p>{medicine.name}</p>
                          </Card.Body>
                        </Card>
                      </div>
                    </Collapse>
                  </div>
                )
            )
          ) : typeof props.type === "string" && props.type.length !== 0 ? (
            medicineData.map(
              (medicine) =>
                medicine.type === props.type && (
                  <div key={medicine.id}>
                    <MedicineCard medicine={medicine} onClick={() => setOpen(medicine.id === open ? -1 : medicine.id)} />
                    <Collapse in={open === medicine.id}>
                      <div>
                        <Card className="card-long">
                          <Card.Body>
                            <p>{medicine.name}</p>
                          </Card.Body>
                        </Card>
                      </div>
                    </Collapse>
                  </div>
                )
            )
          ) : (
            <div className="h-100 d-flex flex-column justify-content-center">
              <p className="text-center">약 목록이 없습니다.</p>
            </div>
          )}
        </Modal.Body>
      )}
    </Modal>
  );
};

export default ItemListModal;
