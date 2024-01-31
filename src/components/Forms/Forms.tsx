import { FC, useState } from 'react';
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Group,
  Radio,
  Select,
  Stepper,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';

import { useForm } from '@mantine/form';
import { IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { formATh, setDataForms } from '../../app/formsSlice.ts';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useAppDispatch } from '../../app/hooks.ts';
import { randomId } from '@mantine/hooks';
import { validateFormsSchema } from '../../utils/yup/validateSchema.ts';
import { StepActive } from '../../utils/enum.ts';
import { formsStyle } from './formsStyles.ts';

export const Forms: FC = () => {
  const [active, setActive] = useState<StepActive>(StepActive.Step1);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

      about: '',
    },

    validate: yupResolver(validateFormsSchema(active)),
  });

  const handleSubmit = (values: typeof form.values) => {
    if (values.about.length > 1) {
      dispatch(setDataForms(values));
      dispatch(formATh());
    }
  };

  const nextStep = () => {
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });
  };
  const prevStep = () => {
    if (active === StepActive.Step1) {
      return navigate('/');
    }
    setActive((prev) => prev - 1);
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

  const checkboxField = form.values.checkbox.map((el, index) => (
    <Group key={el.value} mt="xs">
      <Checkbox
        mt="xs"
        label={el.value}
        checked={el.status}
        {...form.getInputProps(`checkbox.${index}.status`)}
      />
    </Group>
  ));

  return (
    <Box maw={680} p="60px 0 80px 110px">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {/*<form onSubmit={form.onSubmit((values) => console.log(values))}>*/}
        <Stepper active={active}>
          <Stepper.Step>
            <TextInput
              mt="65px"
              style={formsStyle}
              label="Nickname"
              placeholder="Nickname"
              {...form.getInputProps('nickname')}
            />
            <TextInput
              mt="50px"
              style={formsStyle}
              label="Name"
              placeholder="name"
              {...form.getInputProps('name')}
            />
            <TextInput
              mt="50px"
              style={formsStyle}
              label="Sername"
              placeholder="Sername"
              {...form.getInputProps('sername')}
            />
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
              {fields}
            </Group>
            <Group justify="flex-start" mt="md">
              <Button onClick={() => form.insertListItem('advantages', '')}>+</Button>
            </Group>
            <Group mt="25px" display="block">
              <Text fw={500} size="sm">
                Checkbox group
              </Text>
              {checkboxField}
            </Group>
            <Group mt="25px" display="block">
              <Text fw={500} size="sm">
                Radio group
              </Text>
              <Radio.Group {...form.getInputProps('radio')}>
                <Radio mt="xs" value="1" label="1" />
                <Radio mt="xs" value="2" label="2" />
                <Radio mt="xs" value="3" label="3" />
              </Radio.Group>
            </Group>
          </Stepper.Step>
          <Stepper.Step state={'stepInactive'}>
            <Textarea
              mt="65px"
              size="lg"
              label="About"
              maxLength={200}
              placeholder="Placeholder"
              {...form.getInputProps('about')}
            />
          </Stepper.Step>
        </Stepper>

        <Group justify="space-between" mt="90">
          <Button variant="default" onClick={prevStep}>
            Назад
          </Button>
          {active === StepActive.Step3 ? (
            <Button type="submit">Отправить</Button>
          ) : (
            <Button onClick={nextStep}>Далее</Button>
          )}
        </Group>
      </form>
    </Box>
  );
};
