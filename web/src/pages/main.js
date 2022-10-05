import { useState, useEffect } from "react";
import Modals, { modals } from "../components/Modals";
import useModals from "../hooks/useModal";

import { useAxios } from "../hooks/useAxios";

import HeaderSection from "../components/HeaderSection";
import StatusSection from "../components/StatusSection";
import ItemSection from "../components/ItemSection";
import CardContainer from "../components/CardContainer";

import ServiceData from "../ServiceData.json";

import "../assets/style/main.css";

const serviceData = ServiceData.services;

const Main = () => {
  const [medicineTypeData, setMedicineTypeData] = useState(null);
  const [symptomData, setSymptomData] = useState(null);
  const { openModal } = useModals();

  const handleClick = (modal, props) => {
    if (typeof props === "string" && props.startsWith("http")) {
      window.open(props, "_blank");
    } else {
      openModal(modal, { show: true, props });
    }
  };

  useEffect(() => {
    useAxios.get("medicines/types").then((res) => {
      setMedicineTypeData(res.data.types);
    });
    useAxios.get("symptoms").then((res) => {
      setSymptomData(res.data.symptoms);
    });
  }, []);

  return (
    <div className="main">
      <Modals />
      <HeaderSection onClick={handleClick} />
      <StatusSection />
      <ItemSection
        title="종류별로 찾기"
        onClick={() => handleClick(modals.itemGridModal, { handler: handleClick, data: medicineTypeData })}
      >
        <CardContainer size="sm" data={medicineTypeData} onClick={handleClick} modal={modals.itemListModal} />
      </ItemSection>
      <ItemSection title="증상으로 찾기" onClick={() => handleClick(modals.itemGridModal, { handler: handleClick, data: symptomData })}>
        <CardContainer size="sm" data={symptomData} onClick={handleClick} modal={modals.itemListModal} />
      </ItemSection>
      <ItemSection title="이용 가능한 서비스">
        <CardContainer size="md" data={serviceData} onClick={handleClick} modal={modals.healthCareModal} />
      </ItemSection>
    </div>
  );
};

export default Main;
