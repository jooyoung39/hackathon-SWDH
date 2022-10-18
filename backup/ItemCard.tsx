type ItemCardProps = {
  size: string;
  cardData: { id: number; name: string; icon: string; iconColor: string };
  onClick: () => void;
};

const ItemCard = ({ size, cardData, onClick }: ItemCardProps) => (
  <button type="button" className={'card-'.concat(size)} onClick={onClick}>
    <div className="card-body">
      <i
        className={['fa-solid', cardData.icon].join(' ')}
        style={{ color: cardData.iconColor }}
      />
      <p>{cardData.name}</p>
    </div>
  </button>
);

export default ItemCard;
