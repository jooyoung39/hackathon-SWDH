import { createContext } from 'react';
import socketIo from 'socket.io-client';

export const socket = socketIo('https://careus-api.lunabi.co.kr');
export const SocketContext = createContext(socket);

socket.on('connect', () => {
  console.log('socket server connected.');
});

socket.on('disconnect', () => {
  console.log('socket server disconnected.');
});
