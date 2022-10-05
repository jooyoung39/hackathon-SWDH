import ItemCard from "./ItemCard";

const CardContainer = (props) => {
  return (
    <div className={"card-container-".concat(props.size)}>
      {props.data.map((data) => (
        <ItemCard key={data.id} size={props.size} data={data} onClick={() => props.onClick(props.modal, data)} />
      ))}
    </div>
  );
};

export default CardContainer;
