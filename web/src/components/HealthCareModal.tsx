import { useEffect, useState } from 'react';
//
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
//
import {
  useGetMyWalletMutation,
  useRefreshTokenMutation,
} from '../services/careusAPI';
//
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import { setToken } from '../reducers/userSlice';
//
import type { TokenData, WalletData } from '../types';

const HealthCareModal = ({ onClose }: { onClose: () => void }) => {
  const storeDispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(true);
  const [wallet, setWallet] = useState<WalletData>();

  const [getMyWallet] = useGetMyWalletMutation();
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    const fetchMyWallet = (token: TokenData) => {
      getMyWallet(token)
        .unwrap()
        .then((result) => {
          setWallet(result);
        })
        .catch((reason) => {
          if (reason.message === 'jwt expired')
            refreshToken(token)
              .unwrap()
              .then((newToken) => {
                storeDispatch(setToken(newToken));
                getMyWallet(newToken)
                  .unwrap()
                  .then((result) => {
                    setWallet(result);
                  });
              });
        });
    };

    if (userData.token.accessToken.length) {
      fetchMyWallet(userData.token);
    }
  }, []);

  return (
    <Modal
      show={isOpen}
      onHide={() => {
        setIsOpen(false);
        onClose();
      }}
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

      <Modal.Body style={{ marginTop: '-1rem', paddingTop: '1rem' }}>
        <Table className="text-center" bordered>
          <thead>
            <tr>
              <td>학번</td>
              <td>{wallet ? wallet.user_id : '로그인'}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>이름</td>
              <td>{wallet ? userData.name : '이후'}</td>
            </tr>
            <tr>
              <td>가입 여부</td>
              <td>
                {wallet ? (wallet.healthcare_flag ? 'O' : 'X') : '확인가능'}
              </td>
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
    </Modal>
  );
};

export default HealthCareModal;
