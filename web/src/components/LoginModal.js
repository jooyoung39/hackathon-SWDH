import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userSlice";
import { useAxios } from "../hooks/useAxios";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../assets/style/modal.css";

const LoginModal = (props) => {
  const dispatch = useDispatch();

  const [studentNum, setStudentNum] = useState("");
  const [password, setPassword] = useState("");

  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const maxLengthCheck = (e) => {
    const limit = 10;
    setStudentNum(e.target.value.slice(0, limit));
  };

  const Login = (e) => {
    e.preventDefault();

    setIsLoading(true);

    useAxios
      .get("account", {
        params: {
          id: studentNum,
          password: password,
        },
      })
      .then((res) => {
        const code = res.status;

        if (code === 204) {
          setIsInvalid(true);
        } else {
          dispatch(loginUser(res.data.account));
          setIsOpen(false);
          props.onClose();
        }

        setIsLoading(false);
      });
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
        <Modal.Body style={{ marginTop: "-1rem", paddingTop: "1rem", textAlign: "left" }}>
          <Form onSubmit={Login}>
            <div>
              <Form.Group className="mb-3">
                <Form.Label>학번</Form.Label>
                <Form.Control
                  type="number"
                  pattern="\d*"
                  maxLength="10"
                  placeholder="학번을 입력해주세요"
                  value={studentNum}
                  onInput={maxLengthCheck}
                  required
                  isInvalid={isInvalid}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                  required
                  isInvalid={isInvalid}
                />
                <Form.Control.Feedback type="invalid">학번 또는 비밀번호를 확인해 주세요.</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="d-grid">
              <Button type="submit" disabled={isLoading}>
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
