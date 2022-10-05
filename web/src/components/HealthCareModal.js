import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";

import "../assets/style/modal.css";

const HealthCareModal = ({ show, onClose, props }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const id = useSelector((state) => state.user.id);
  const name = useSelector((state) => state.user.name);
  const isHealthcare = useSelector((state) => state.user.isHealthcare);

  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal
      show={isOpen && show}
      onHide={() => {
        setIsOpen(false);
        onClose();
      }}
      centered
    >
      <Modal.Header style={{ borderBottom: "0" }}>
        <CloseButton
          onClick={() => {
            setIsOpen(false);
            onClose();
          }}
        />
      </Modal.Header>
      {show && (
        <Modal.Body style={{ marginTop: "-1rem", paddingTop: "1rem" }}>
          <Table className="text-center" bordered>
            <thead>
              <tr>
                <td>학번</td>
                <td>{isLogin ? id : "로그인"}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>이름</td>
                <td>{isLogin ? name : "이후"}</td>
              </tr>
              <tr>
                <td>가입 여부</td>
                <td>{isLogin ? (isHealthcare ? "O" : "X") : "확인가능"}</td>
              </tr>
            </tbody>
          </Table>

          <ListGroup>
            <ListGroup.Item variant="primary">건강공제 혜택안내</ListGroup.Item>
            <ListGroup.Item>국민건강보험으로 처리된 의료비 공제</ListGroup.Item>
            <ListGroup.Item>교내 건강센터 이용 비용의 90%를 지원</ListGroup.Item>
            <ListGroup.Item variant="primary">가입 가능 대상</ListGroup.Item>
            <ListGroup.Item>재학생, 신입생, 편입생</ListGroup.Item>
            <ListGroup.Item variant="primary">가입 방법</ListGroup.Item>
            <ListGroup.Item>자율경비 선택기간에 건강공제회비 납부</ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      )}
    </Modal>
  );
};

export default HealthCareModal;
