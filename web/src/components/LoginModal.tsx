import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  useDoLoginMutation,
  useGetUserInfoMutation,
} from '../services/careusAPI';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import { setToken, setUserInfo } from '../reducers/userSlice';
import styles from '../assets/style/modal_login.module.scss';

const LoginModal = ({ onClose }: { onClose: () => void }): JSX.Element => {
  const storeDispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);

  const [doLogin] = useDoLoginMutation();
  const [getUserInfo] = useGetUserInfoMutation();

  const [studentNum, setStudentNum] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (userData.token.accessToken.length) {
      getUserInfo(userData.token)
        .unwrap()
        .then((UserInfoData) => {
          storeDispatch(setUserInfo(UserInfoData));

          setIsOpen(false);
          onClose();
        })
        .catch(() => {
          setIsInvalid(true);
        });
    }
  }, [userData.token]);

  const maxLengthCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = 10;
    setStudentNum(e.target.value.slice(0, limit));
  };

  const Login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    doLogin({ user_id: studentNum, password })
      .unwrap()
      .then(async (TokenData) => {
        await storeDispatch(setToken(TokenData));
      })
      .catch(() => {
        setIsInvalid(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      className={styles.modal}
      show={isOpen}
      onHide={() => {
        setIsOpen(false);
        onClose();
      }}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header style={{ borderBottom: '0' }}>
        <CloseButton
          onClick={() => {
            setIsOpen(false);
            onClose();
          }}
        />
      </Modal.Header>

      <Modal.Body style={{ textAlign: 'left' }}>
        <Form onSubmit={Login}>
          <div>
            <Form.Group className="mb-3">
              <Form.Label>학번</Form.Label>
              <Form.Control
                type="number"
                pattern="\d*"
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
                onInput={(e) =>
                  setPassword((e.target as HTMLInputElement).value)
                }
                required
                isInvalid={isInvalid}
              />
              <Form.Control.Feedback type="invalid">
                학번 또는 비밀번호를 확인해 주세요.
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="d-grid">
            <Button type="submit" disabled={isLoading}>
              로그인
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
