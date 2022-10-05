import Card from "react-bootstrap/Card";

const ItemCard = (props) => {
  return (
    <Card className={"card-".concat(props.size)} style={{ cursor: "pointer" }} onClick={props.onClick}>
      <Card.Body>
        <i className={["fa-solid", props.data.icon].join(" ")} style={{ color: props.data.iconColor }}></i>
        <p>{props.data.name}</p>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
