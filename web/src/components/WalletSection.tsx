import { useEffect, useState } from 'react';
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
//
import styles from '../assets/style/section_wallet.module.scss';

const WalletSection = () => {
  const storeDispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);
  const [wallet, setWallet] = useState<WalletData>();

  const [getMyWallet] = useGetMyWalletMutation();
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    const fetchMyWallet = async (token: TokenData) => {
      await getMyWallet(token)
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

    if (userData.token.accessToken.length) fetchMyWallet(userData.token);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.balance}>
        <div>
          <p>
            {wallet
              ? `${String(wallet.money).replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ',',
                )}원`
              : '로그인 필요'}
          </p>
          <p>{wallet && wallet.healthcare_flag && '건강 공제 가입 중'}</p>
        </div>
        <i className="fa-regular fa-wallet" />
      </div>
      <div className={styles.pay}>
        <p>결제</p>
        <i className="fa-solid fa-barcode-read" />
      </div>
      <div className={styles.charge}>
        <p>충전</p>
        <i className="fa-regular fa-piggy-bank" />
      </div>
    </section>
  );
};

export default WalletSection;
