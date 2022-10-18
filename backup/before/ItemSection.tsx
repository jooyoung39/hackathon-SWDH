const ItemSection = (props) => {
  return (
    <section className="item-section">
      <div className="section-header">
        <h3 className="mb-0">{props.title}</h3>
        {props.onClick && (
          <a
            href="#javascript"
            onClick={props.onClick}
            className="text-secondary"
          >
            전체보기
          </a>
        )}
      </div>
      {props.children}
    </section>
  );
};

export default ItemSection;
