import { useState } from "react";
import { useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { modals } from "./Modals";
import dayjs from "dayjs";
import "dayjs/locale/ko";

const HeaderSection = ({ onClick }) => {
  const [show, setShow] = useState(false);
  const isLogin = useSelector((state) => state.user.isLogin);
  const name = useSelector((state) => state.user.name);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <section className="header-section">
        <h1 className="mb-0">
          {isLogin ? (
            "안녕하세요, " + name + "님!"
          ) : (
            <>
              <a href="#javascript" onClick={() => onClick(modals.loginModal)} style={{ color: "black", textUnderlinePosition: "under" }}>
                로그인
              </a>
              하기
            </>
          )}
        </h1>
        <h1 className="mb-0" onClick={handleShow}>
          <i className="fa-solid fa-bell"></i>
        </h1>
      </section>

      <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: "18rem" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>알림</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ boxSizing: "border-box" }}>
          <ToastContainer style={{ position: "relative" }}>
            <Toast style={{ width: "100%" }}>
              <Toast.Header closeButton={false}>
                <strong className="me-auto">물품 제공 안내</strong>
                <small className="text-muted">지금</small>
              </Toast.Header>
              <Toast.Body>
                {dayjs().get("M")}월 {dayjs().get("D")}일 오후 2시부터 학생회관 1층에서 COVID-19 자가진단 키트를 제공해 드립니다. 한정
                수량이니 필요한 학생은 시간에 맞춰 수령 바랍니다.
              </Toast.Body>
            </Toast>
            <Toast>
              <Toast.Header closeButton={false}>
                <strong className="me-auto">재입고 안내</strong>
                <small className="text-muted">1 시간 전</small>
              </Toast.Header>
              <Toast.Body>교내 보건실 타이레놀이 재입고되어 구매 가능합니다.</Toast.Body>
            </Toast>
          </ToastContainer>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default HeaderSection;
