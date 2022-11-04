type ItemCardProps = {
  size: string;
  name: string;
  icon: string;
  iconColor: string;
  onClick: () => void;
};

const ItemCard = ({ size, name, icon, iconColor, onClick }: ItemCardProps) => (
  <button type="button" className={'card-'.concat(size)} onClick={onClick}>
    <div className="card-body">
      <i
        className={['fa-solid', icon].join(' ')}
        style={{ color: iconColor }}
      />
      <p>{name}</p>
    </div>
  </button>
);

export default ItemCard;
