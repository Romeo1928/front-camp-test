import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../src/components/MainPage.tsx';
import { Form } from '../src/components/Form.tsx';

const App: FC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MainPage />} />
      <Route path={'/step'} element={<Form />} />
      {/*<Route path={'/404'} element={<h1>404:PAGE NOT FOUND</h1>} />*/}
      {/*<Route path={'*'} element={<Navigate to={'/404'} />} />*/}
    </Routes>
  );
};

export default App;
