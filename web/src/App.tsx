import { useEffect } from 'react';
// React Router
import { Route, Routes } from 'react-router-dom';
// Pages
import Main from './pages/MainPage';
import InfirmaryPage from './pages/InfirmaryPage';
import AllMenu from './pages/AllMemuPage';
//
import { socket, SocketContext } from './services/socket';

const App = (): JSX.Element => (
  <SocketContext.Provider value={socket}>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/infirmary" element={<InfirmaryPage />} />
      <Route path="/all" element={<AllMenu />} />
    </Routes>
  </SocketContext.Provider>
);

export default App;
