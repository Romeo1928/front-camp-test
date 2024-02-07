import { FC } from 'react';
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Group,
  Loader,
  Radio,
  rem,
  Select,
  Stepper,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
  formATh,
  getActiveStep,
  getIsError,
  getIsLoading,
  setActiveStep,
  setDataForms,
} from 'app/formsSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { validateFormsSchema } from 'utils/yup/validateSchema';
import { formsStyle, isLoadingStyle } from 'components/Forms/formsStyles';
import { ROUTES } from 'utils/enum/routes';
import { StepActive } from 'utils/enum/stepActive';
import { NotificationWithButton } from 'shared/NotificationWithButton';

type TextInputData = {
  mt: string;
  label: 'Nickname' | 'Name' | 'Sername';
  placeholder: 'Nickname' | 'Name' | 'Sername';
  path: 'nickname' | 'name' | 'sername';
};

const textInputData: TextInputData[] = [
  { mt: '65px', label: 'Nickname', placeholder: 'Nickname', path: 'nickname' },
  { mt: '50px', label: 'Name', placeholder: 'Name', path: 'name' },
  { mt: '50px', label: 'Sername', placeholder: 'Sername', path: 'sername' },
];
const radioData: string[] = ['1', '2', '3'];
export const Forms: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const activeStep = useAppSelector(getActiveStep);
  const isLoading = useAppSelector(getIsLoading);
  const error = useAppSelector(getIsError);

  const form = useForm({
    initialValues: {
      nickname: 'Romeo',
      name: 'Roman',
      sername: 'Romanov',
      sex: 'man',

      advantages: [
        { name: '123', key: randomId() },
        { name: '456', key: randomId() },
        { name: '789', key: randomId() },
      ],
      checkbox: [
        { value: 1, status: false },
        { value: 2, status: false },
        { value: 3, status: false },
      ],
      radio: '1',

      about: 'Text...',
    },

    validate: yupResolver(validateFormsSchema(activeStep)),
  });

  const handleSubmit = (values: typeof form.values) => {
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

  const nextStep = () => {
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

  const fields = form.values.advantages.map((el, index) => (
    <Group key={el.key} mt="xs">
      <TextInput
        style={formsStyle}
        placeholder="Placeholder"
        {...form.getInputProps(`advantages.${index}.name`)}
      />
      <ActionIcon color="red" onClick={() => form.removeListItem('advantages', index)}>
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));
  const checkboxFields = form.values.checkbox.map((el, index) => (
    <Group key={el.value} mt="xs">
      <Checkbox
        mt="xs"
        label={el.value}
        checked={el.status}
        {...form.getInputProps(`checkbox.${index}.status`)}
      />
    </Group>
  ));
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

  return (
    <Box style={{ position: 'relative' }} maw={680} m="60px 0 80px 110px">
      {isLoading === 'loading' && (
        <div style={isLoadingStyle}>
          <Loader size={70} color="blue" />
        </div>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stepper active={activeStep}>
          <Stepper.Step>
            {textInputData.map((el) => (
              <TextInput
                key={el.path}
                mt={el.mt}
                style={formsStyle}
                label={el.label}
                placeholder={el.placeholder}
                {...form.getInputProps(el.path)}
              />
            ))}
            <Select
              mt="50px"
              style={formsStyle}
              label="Sex"
              placeholder="Не выбрано"
              data={['man', 'woman']}
              {...form.getInputProps('sex')}
            />
          </Stepper.Step>

          <Stepper.Step>
            <Group mt="65px" display="block">
              <Text fw={500} size="sm">
                Advantages
              </Text>
            </Group>
            {fields}
            <Group justify="flex-start" mt="md">
              <Button
                onClick={() =>
                  form.insertListItem('advantages', { name: '', key: randomId() })
                }
              >
                +
              </Button>
            </Group>
            <Group mt="25px" display="block">
              <Text fw={500} size="sm">
                Checkbox group
              </Text>
            </Group>
            {checkboxFields}
            <Group mt="25px" display="block">
              <Text fw={500} size="sm">
                Radio group
              </Text>
              <Radio.Group {...form.getInputProps('radio')}>
                {radioData.map((el) => (
                  <Radio key={el} mt="xs" value={el} label={el} />
                ))}
              </Radio.Group>
            </Group>
          </Stepper.Step>

          <Stepper.Step>
            <Textarea
              mt="65px"
              size="lg"
              label="About"
              maxLength={200}
              placeholder="Placeholder"
              {...form.getInputProps('about')}
              disabled={isLoading === 'loading'}
            />
          </Stepper.Step>

          <Stepper.Completed>
            {activeStep === StepActive.StepError ? (
              <NotificationWithButton
                icon={xIcon}
                color={'red'}
                title={error}
                onClick={prevStep}
              >
                закрыть
              </NotificationWithButton>
            ) : (
              <NotificationWithButton
                mt={'md'}
                icon={checkIcon}
                color={'teal'}
                title={'Форма успешно отправлена'}
                onClick={onClickMainFormHandler}
              >
                На главную
              </NotificationWithButton>
            )}
          </Stepper.Completed>
        </Stepper>

        <Group justify="space-between" mt="90">
          <Button variant="default" onClick={prevStep} disabled={isLoading === 'loading'}>
            Назад
          </Button>
          {activeStep === StepActive.Step3 ? (
            <Button key="1" type="submit" disabled={isLoading === 'loading'}>
              Отправить
            </Button>
          ) : (
            <Button onClick={nextStep}>Далее</Button>
          )}
        </Group>
      </form>
    </Box>
  );
};
