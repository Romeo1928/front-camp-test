import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainFormPage } from 'components/MainFormPage/MainFormPage.tsx';
import { Forms } from 'components/Forms/Forms.tsx';

const App: FC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MainFormPage />} />
      <Route path={'/step'} element={<Forms />} />
    </Routes>
  );
};

export default App;
