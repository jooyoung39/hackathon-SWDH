import Card from 'react-bootstrap/Card';

import styles from '../assets/style/card_medicine.module.scss';

type Props = {
  name: string;
  icon: string;
  quantity: number;
  onClick: () => void;
};

const iconStyle: { [key: string]: string } = {
  tablets: 'fa-tablets',
  capsules: 'fa-capsules',
  vial: 'fa-vial',
  patch: 'fa-note-medical',
};

const MedicineCard = ({ name, icon, quantity, onClick }: Props) => (
  <Card className={styles.card} onClick={onClick}>
    <Card.Body>
      <p>
        <i className={['fa-solid', iconStyle[icon]].join(' ')} />
        {name}
      </p>
      <p
        style={{
          color: quantity ? 'cornflowerblue' : 'LightCoral',
        }}
      >
        {quantity ? `${quantity}개 남음` : '품절'}
      </p>
    </Card.Body>
  </Card>
);

export default MedicineCard;
