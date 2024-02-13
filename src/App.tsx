import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainFormPage } from 'components/MainFormPage/MainFormPage';
import { Forms } from 'components/Forms/Forms';
import { ROUTES } from 'utils/enum/routes';

const App: FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN} element={<MainFormPage />} />
      <Route path={ROUTES.STEP} element={<Forms />} />
    </Routes>
  );
};

export default App;
