import Section from './Section';
import CardContainer from './CardContainer';

type CardSectionProps = {
  title: string;
  cardData: Array<{
    id: number;
    name: string;
    icon: string;
    iconColor: string;
  }>;
  onClick: () => void;
};

const CardSection = ({ title, cardData, onClick }: CardSectionProps) => {
  <Section>
    <Section.Header title={title} />
    <CardContainer size="md" cardData={cardData} onClick={onClick} />
  </Section>;
};

export default CardSection;
