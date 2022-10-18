import { useEffect, useState } from 'react';
import { useModalsDispatch } from '../hooks/useModal';

import useAxios from '../hooks/useAxios';

import Section from '../components/Section';

import HealthCareModal from '../components/HealthCareModal';
import HeaderSection from '../components/HeaderSection';
import StatusSection from '../components/StatusSection';
import CardContainer from '../components/CardContainer';

import ServiceData from '../ServiceData.json';
import { useModalsDispatch } from '../hooks/useModal';

const serviceData = ServiceData.services;

const Main = () => {
  const ModalDispatch = useModalsDispatch();
  const [medicineTypeData, setMedicineTypeData] = useState(undefined);
  const [symptomData, setSymptomData] = useState(undefined);
  const { openModal } = useModals();

  const handleClick = (modalType: string, data?: object | string) => {
    const modal = {
      health: HealthCareModal,
    }[modalType];

    if (data === undefined) {
      openModal(modal, { show: true });
    } else if (typeof data === 'string' && data.startsWith('http')) {
      window.open(data, '_blank');
    } else {
      openModal(modal, { show: true, data });
    }
  };

  useEffect(() => {
    useAxios.get('medicines/types').then((res) => {
      setMedicineTypeData(res.data.types);
    });
    useAxios.get('symptoms').then((res) => {
      setSymptomData(res.data.symptoms);
    });
  }, []);

  return (
    <div className="main">
      <HeaderSection />
      <StatusSection />
      <Section>
        <Section.Header
          title="종류별로 찾기"
          onClick={() =>
            handleClick('grid', {
              handler: handleClick,
              data: medicineTypeData,
            })
          }
          onClickText="전체보기"
        />
        <CardContainer
          size="sm"
          cardData={medicineTypeData}
          onClick={(cardData) => handleClick('list', cardData)}
        />
      </Section>
      <Section>
        <Section.Header
          title="증상으로 찾기"
          onClick={() =>
            handleClick('grid', {
              handler: handleClick,
              data: symptomData,
            })
          }
          onClickText="전체보기"
        />
        <CardContainer
          size="sm"
          cardData={symptomData}
          onClick={() => handleClick('list')}
        />
      </Section>
      <Section>
        <Section.Header title="이용 가능한 서비스" />
        <CardContainer
          size="md"
          cardData={serviceData}
          onClick={() => handleClick('health')}
        />
      </Section>
    </div>
  );
};

export default Main;
