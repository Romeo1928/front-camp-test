import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainFormPage } from '../src/components/MainFormPage/MainFormPage.tsx';
import { Forms } from '../src/components/Forms/Forms.tsx';

const App: FC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MainFormPage />} />
      <Route path={'/step'} element={<Forms />} />
      {/*<Route path={'/404'} element={<h1>404:PAGE NOT FOUND</h1>} />*/}
      {/*<Route path={'*'} element={<Navigate to={'/404'} />} />*/}
    </Routes>
  );
};

export default App;
