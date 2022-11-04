import styles from '../assets/style/chat_bubble.module.scss';

type Props = {
  text: string;
  isMine: boolean;
};

const ChatBubble = ({ text, isMine }: Props) => (
  <div className={styles.wrapper}>
    <div className={isMine ? styles.bubble_me : styles.bubble_you}>{text}</div>
  </div>
);

export default ChatBubble;
