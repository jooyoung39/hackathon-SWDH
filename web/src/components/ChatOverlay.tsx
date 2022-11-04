import React, { useEffect, useRef, useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
//
import { useAppSelector } from '../hooks/useStore';
//
import { socket, SocketContext } from '../services/socket';
//
import styles from '../assets/style/chat.module.scss';
import ChatBubble from './ChatBubble';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ChatOverlay = ({ isOpen, setIsOpen }: Props) => {
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const [userChat, setUserChat] = useState<string>('');
  const userData = useAppSelector((state) => state.user);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    socket.on('new_message', () => {
      console.log('nm');
    });
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [ChatOverlay]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userChat.length) {
      socket.emit('message', {
        sender_id: userData.user_id,
        message: userChat,
      });
      setUserChat('');
      scrollToBottom();
    }
  };

  return (
    <div className={[styles.chatbox, isOpen ? styles.active : ''].join(' ')}>
      <div className={styles.header}>
        <CloseButton
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </div>
      <div className={styles.chats} ref={scrollRef}>
        <ChatBubble text="aaaaaaa" isMine />
        <ChatBubble text="aaaaaaa" isMine />
        <ChatBubble text="aaaaaaa" isMine={false} />
        <ChatBubble text="aaaaaaa" isMine />
        <ChatBubble text="aaaaaaa" isMine />
        <ChatBubble text="aaaaaaa" isMine />
        <ChatBubble text="aaaaaaa" isMine={false} />
        <ChatBubble text="aaaaaaa" isMine />
        <ChatBubble text="aaaaaaa" isMine />
        <ChatBubble text="aaaaaaa" isMine />
        <ChatBubble text="aaaaaaa" isMine={false} />
        <ChatBubble text="aaaaaaa" isMine />
      </div>
      <div className={styles.userinput}>
        <Form onSubmit={sendMessage}>
          <InputGroup>
            <Form.Control
              placeholder="보낼 메시지를 입력하세요"
              aria-label="보낼 메시지"
              aria-describedby="userMessage"
              value={userChat}
              onInput={(e) => setUserChat((e.target as HTMLInputElement).value)}
            />
            <Button variant="primary" type="submit">
              전송
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default ChatOverlay;
