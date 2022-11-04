import { useEffect, useState } from 'react';
import ServiceData from '../ServiceData.json';
import HeaderSection from '../components/HeaderSection';
import StatusSection from '../components/StatusSection';
import CardSection from '../components/CardSection';
import {
  useGetMedicineTypesMutation,
  useGetSymptomsMutation,
} from '../services/careusAPI';

import type { MedicineTypeData, SymptomData } from '../types';

const serviceData = ServiceData.services;

const MainPage = () => {
  const [medicineTypes, setMedicineTypes] = useState<MedicineTypeData[]>([]);
  const [symptoms, setSymptoms] = useState<SymptomData[]>([]);

  const [getMedicineTypes] = useGetMedicineTypesMutation();
  const [getSymptoms] = useGetSymptomsMutation();

  useEffect(() => {
    const fetchMedicineTypes = async () => {
      await getMedicineTypes()
        .unwrap()
        .then(
          (result) => {
            setMedicineTypes(result);
          },
          () => {
            setMedicineTypes([]);
          },
        );
    };

    const fetchSymptoms = async () => {
      await getSymptoms()
        .unwrap()
        .then(
          (result) => {
            setSymptoms(result);
          },
          () => {
            setSymptoms([]);
          },
        );
    };
    fetchMedicineTypes();
    fetchSymptoms();
  }, [getMedicineTypes, getSymptoms]);

  return (
    <div className="main">
      <HeaderSection />
      <StatusSection />
      <CardSection
        title="종류별로 찾기"
        size="sm"
        data={medicineTypes}
        isExpandable
      />
      <CardSection
        title="증상별로 찾기"
        size="sm"
        data={symptoms}
        isExpandable
      />
      <CardSection title="이용 가능한 서비스" size="md" data={serviceData} />
    </div>
  );
};

export default MainPage;
