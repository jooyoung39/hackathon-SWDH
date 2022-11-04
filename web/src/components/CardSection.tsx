import Spinner from 'react-bootstrap/Spinner';
import ItemCard from './ItemCard';
import ItemGridModal from './ItemGridModal';
import MedicineListModal from './MedicineListModal';
import HealthCareModal from './HealthCareModal';
import { useModalsDispatch } from '../hooks/useModal';
import styles from '../assets/style/section_card.module.scss';

type Props = {
  title: string;
  size: string;
  data: Array<{
    id: number;
    name: string;
    icon: string;
    iconColor: string;
    type: string | Array<string>;
  }>;
  isExpandable?: boolean;
};

const CardSection = ({ title, size, data, isExpandable }: Props) => {
  const ModalsDispatch = useModalsDispatch();

  const openMedicineListModal = (type: string | Array<string>) => {
    let modalData;
    if (typeof type === 'string' && type.startsWith('http')) {
      window.open(type, '_blank');
    } else {
      if (typeof type === 'string') modalData = [type];
      else modalData = type;

      if (modalData[0] === 'healthcare') {
        ModalsDispatch({
          type: 'OPEN',
          Component: HealthCareModal,
          data: {},
        });
      } else {
        ModalsDispatch({
          type: 'OPEN',
          Component: MedicineListModal,
          data: modalData,
        });
      }
    }
  };

  return (
    <section className={styles.section}>
      <div className="section-header">
        <h3>{title}</h3>
        {isExpandable && (
          <button
            type="button"
            onClick={() => {
              ModalsDispatch({
                type: 'OPEN',
                Component: ItemGridModal,
                data,
              });
            }}
          >
            전체보기
          </button>
        )}
      </div>
      <div className={'card-container-'.concat(size)}>
        {data.length ? (
          data.map((card) => (
            <ItemCard
              key={card.id}
              size={size}
              name={card.name}
              icon={card.icon}
              iconColor={card.iconColor}
              onClick={() => {
                openMedicineListModal(card.type);
              }}
            />
          ))
        ) : (
          <div className={styles['spinner-container']}>
            <Spinner
              animation="border"
              variant="secondary"
              style={{ alignSelf: 'center', justifySelf: 'center' }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

CardSection.defaultProps = {
  isExpandable: false,
};

export default CardSection;
