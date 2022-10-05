import Modals, { modals } from "../components/Modals";
import useModals from "../hooks/useModal";

import CardContainer from "../components/CardContainer";
import ItemSection from "../components/ItemSection";

import UserData from "../UserData.json";
import MedicineData from "../MedicineData.json";
import SymptomData from "../SymptomData.json";
import ServiceData from "../ServiceData.json";

import "../assets/style/main.css";

const userData = UserData;
const medicineTypeData = MedicineData.types;
const symptomData = SymptomData.symptoms;
const serviceData = ServiceData.services;

const Main = () => {
  const { openModal } = useModals();

  const handleClick = (modal, props) => {
    if (typeof props === "string" && props.startsWith("http")) {
      window.open(props, "_blank");
    } else {
      openModal(modal, { show: true, props });
    }
  };

  return (
    <div className="main">
      <Modals />
      <section className="d-flex justify-content-between align-items-center w-100 px-3 mb-3">
        <h1 className="mb-0">
          {userData.isLoggedIn ? (
            "안녕하세요, 김야옹님!"
          ) : (
            <>
              <a
                href="#javascript"
                onClick={() => handleClick(modals.loginModal)}
                style={{ color: "black", textUnderlinePosition: "under" }}
              >
                로그인
              </a>
              하기
            </>
          )}
        </h1>
      </section>
      <section className="status-section">
        <div className="card-container-lg">
          <div className="card card-status">
            <div className="card-body d-flex align-items-center">
              <i className="fa-solid fa-user-doctor-hair" />
              <div className="status-data">
                <h3 className="mb-1">교내 보건실</h3>
                <h6 className="mb-1">운영시간: 08:00 ~ 18:00</h6>
                <h2 className="">이용 가능</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
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
