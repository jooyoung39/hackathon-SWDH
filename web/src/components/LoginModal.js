import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../assets/style/modal.css";

const LoginModal = (props) => {
  const [studentNum, setStudentNum] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const maxLengthCheck = (e) => {
    const limit = 10;
    setStudentNum(e.target.value.slice(0, limit));
    console.log("checked");
  };

  return (
    <Modal className="modal-login" show={isOpen && props.show} onHide={props.onHide} backdrop="static" keyboard={false} centered>
      <Modal.Header style={{ borderBottom: "0" }}>
        <CloseButton
          onClick={() => {
            setIsOpen(false);
            props.onClose();
          }}
        />
      </Modal.Header>
      {props.show && (
        <Modal.Body style={{ marginTop: "-1rem", paddingTop: "1rem" }}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>학번</Form.Label>
              <Form.Control
                type="number"
                pattern="\d*"
                maxLength="10"
                placeholder="학번을 입력해주세요"
                value={studentNum}
                onInput={maxLengthCheck}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" placeholder="비밀번호를 입력해주세요" />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit">
                로그인
              </Button>
            </div>
          </Form>
        </Modal.Body>
      )}
    </Modal>
  );
};

export default LoginModal;
