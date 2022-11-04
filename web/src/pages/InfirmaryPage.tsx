import { useState, useRef } from 'react';
//
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
//
import WalletSection from '../components/WalletSection';
import ReservationSection from '../components/ReservationSection';
import ChatOverlay from '../components/ChatOverlay';
//
import { useAppSelector } from '../hooks/useStore';
//
import styles from '../assets/style/page_infirmary.module.scss';

const InfirmaryPage = () => {
  const openButton = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [needLogin, setNeedLogin] = useState(false);
  const userData = useAppSelector((state) => state.user);

  const openChat = () => {
    if (userData.token.accessToken.length) {
      setIsChatOpen(true);
    } else {
      setNeedLogin(true);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>내 보건실</h1>
      <WalletSection />
      <ReservationSection />
      <button
        type="button"
        ref={openButton}
        className={styles.chatbutton}
        onClick={openChat}
      >
        <i className="fa-solid fa-message-plus fa-flip-horizontal" />
      </button>
      <Overlay target={openButton.current} show={needLogin} placement="top">
        <Tooltip id="overlay-example">로그인이 필요합니다.</Tooltip>
      </Overlay>
      <ChatOverlay isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default InfirmaryPage;
