import React from "react";
import Card from "react-bootstrap/Card";

const MedicineCard = (props) => {
  return (
    <Card style={{ cursor: "pointer" }} className="card-long" onClick={props.onClick}>
      <Card.Body>
        <p>
          <i className={["fa-solid", props.medicine.icon].join(" ")}></i>
          {props.medicine.name}
        </p>
      </Card.Body>
    </Card>
  );
};

export default MedicineCard;
