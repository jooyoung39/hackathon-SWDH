import Placeholder from 'react-bootstrap/Placeholder';
import ItemCard from './ItemCard';

type CardContainerProps = {
  size: string;
  cardData:
    | Array<{
        id: number;
        name: string;
        icon: string;
        iconColor: string;
      }>
    | undefined;
  onClick: (cardData: object) => void;
};

const CardContainer = ({ size, cardData, onClick }: CardContainerProps) => (
  <div className={'card-container-'.concat(size)}>
    {cardData ? (
      cardData.map((card) => (
        <ItemCard
          key={card.id}
          size={size}
          cardData={card}
          onClick={() => onClick(card)}
        />
      ))
    ) : (
      <Placeholder />
    )}
  </div>
);

export default CardContainer;
