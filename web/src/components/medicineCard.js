import React from "react";
import Card from "react-bootstrap/Card";

const icon = {
  tablets: "fa-tablets",
  capsules: "fa-capsules",
  vial: "fa-vial",
  patch: "fa-note-medical",
};

const MedicineCard = (props) => {
  return (
    <Card style={{ cursor: "pointer" }} className="card-long" onClick={props.onClick}>
      <Card.Body>
        <p>
          <i className={["fa-solid", icon[props.medicine.icon]].join(" ")}></i>
          {props.medicine.name}
        </p>
        <p style={{ color: props.medicine.quantity ? "cornflowerblue" : "LightCoral" }}>
          {props.medicine.quantity ? props.medicine.quantity + "개 남음" : "품절"}
        </p>
      </Card.Body>
    </Card>
  );
};

export default MedicineCard;
