import { StepActive } from 'utils/enum/stepActive.ts';
import { formATh, getActiveStep, setActiveStep, setDataForms } from 'app/formsSlice.ts';
import { ROUTES } from 'utils/enum/routes.ts';
import { useAppDispatch, useAppSelector } from 'app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { UseFormReturnType } from '@mantine/form';

type FormValues = {
  nickname: string;
  name: string;
  sername: string;
  sex: string;

  advantages: { name: string; key: string }[];
  checkbox: { value: number; status: boolean }[];
  radio: string;

  about: string;
};

type UseFormHandlerType = {
  handleSubmit: (values: FormValues) => void;
  nextStep: (form: UseFormReturnType<FormValues>) => void;
  prevStep: () => void;
  onClickMainFormHandler: () => void;
};

export const UseFormHandler = (): UseFormHandlerType => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const activeStep = useAppSelector(getActiveStep);
  const handleSubmit = (values: FormValues) => {
    if (activeStep === StepActive.Step3) {
      dispatch(
        setDataForms({
          ...values,
          advantages: values.advantages.map((el) => ({ ...el })),
          checkbox: values.checkbox.map((el) => ({ ...el })),
        }),
      );
      dispatch(formATh());
    }
  };

  const nextStep = (form: UseFormReturnType<FormValues>) => {
    if (form.validate().hasErrors) {
      return;
    }
    dispatch(setActiveStep(activeStep < StepActive.Step3 ? activeStep + 1 : activeStep));
  };

  const prevStep = () => {
    if (activeStep === StepActive.Step1) {
      navigate(ROUTES.MAIN);
    } else {
      dispatch(setActiveStep(activeStep - 1));
    }
  };

  const onClickMainFormHandler = () => {
    navigate(ROUTES.MAIN);
  };
  return { handleSubmit, nextStep, prevStep, onClickMainFormHandler };
};
