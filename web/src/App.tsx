// React Router
import { Route, Routes } from 'react-router-dom';
// Pages
import Main from './pages/Main';
import Test from './pages/Test';
import AllMenu from './pages/AllMemu';

const App = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/all" element={<AllMenu />} />
    <Route path="/test" element={<Test />} />
  </Routes>
);

export default App;
