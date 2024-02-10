import { FC } from 'react';
import {
  ActionIcon,
  Box,
  Button,
  Center,
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
import { getActiveStep, getIsError, getIsLoading } from 'app/formsSlice';
import { useAppSelector } from 'app/hooks';
import { validateFormsSchema } from 'utils/yup/validateSchema';
import { isLoadingStyle } from 'components/Forms/formsStyles';
import { StepActive } from 'utils/enum/stepActive';
import { NotificationWithButton } from 'shared/NotificationWithButton';
import { textInputData } from 'configs/textInputData';
import { radioData } from 'configs/radioData';
import { UseFormHandler } from 'hooks/useFormHandler.ts';

export const Forms: FC = () => {
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
        { value: 1, status: true },
        { value: 2, status: false },
        { value: 3, status: false },
      ],
      radio: '1',

      about: 'Text...',
    },

    validate: yupResolver(validateFormsSchema(activeStep)),
  });
  const { handleSubmit, nextStep, prevStep, onClickMainFormHandler } = UseFormHandler();

  const fields = form.values.advantages.map((field, index) => (
    <Group key={field.key} mt="xs">
      <TextInput
        mb="5px"
        w="300px"
        h="44px"
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
    <Box pos="relative" maw={680} m="60px 0 80px 110px">
      {isLoading === 'loading' && (
        <Center style={isLoadingStyle}>
          <Loader size={70} color="blue" />
        </Center>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stepper active={activeStep}>
          <Stepper.Step>
            {textInputData.map((el) => (
              <TextInput
                key={el.path}
                mt={el.mt}
                mb={el.mb}
                w={el.w}
                h={el.h}
                label={el.label}
                placeholder={el.placeholder}
                {...form.getInputProps(el.path)}
              />
            ))}
            <Select
              mt="50px"
              mb="5px"
              w="300px"
              h="44px"
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
            <Button key="1" type="submit" loading={isLoading === 'loading'}>
              Отправить
            </Button>
          ) : (
            <Button onClick={() => nextStep(form)}>Далее</Button>
          )}
        </Group>
      </form>
    </Box>
  );
};
