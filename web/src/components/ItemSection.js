const ItemSection = (props) => {
  return (
    <section className="item-section">
      <div className="row m-0 mb-4">
        <div className="col-9 align-self-center p-0">
          <h3 className="mb-0">{props.title}</h3>
        </div>
        {props.onClick && (
          <div className="col text-end align-self-center p-0">
            <a href="#javascript" onClick={props.onClick} zz="1" className="text-secondary">
              전체보기
            </a>
          </div>
        )}
      </div>
      {props.children}
    </section>
  );
};

export default ItemSection;
