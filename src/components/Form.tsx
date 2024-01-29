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

import { formATh, setDataForms } from '../app/formsSlice.ts';
import { yupResolver } from 'mantine-form-yup-resolver';
import * as yup from 'yup';
import { useAppDispatch } from '../app/hooks.ts';

export const Form: FC = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // yup
  const validateSchema = yup.object().shape({
    nickname: yup
      .string()
      .test(
        'char-or-number',
        () => `только буквы и цифры`,
        (value) => value == null || /^[а-яА-Яa-zA-Z0-9]+$/.test(value),
      )
      .max(30, 'max 30 символов')
      .required('обязательное поле'),
    name: yup
      .string()
      .test(
        'only char',
        () => `только буквы`,
        (value) => value == null || /^[а-яА-Яa-zA-Z]+$/.test(value),
      )
      .max(50, 'max 50 символов')
      .required('обязательное поле'),
    sername: yup
      .string()
      .test(
        'only char',
        () => `только буквы`,
        (value) => value == null || /^[а-яА-Яa-zA-Z]+$/.test(value),
      )
      .max(50, 'макс. 50 символов')
      .required('обязательное поле'),
    sex: yup.mixed().oneOf(['man', 'woman'], 'выберите пол'),

    advantages: yup.array().of(
      yup
        .string()
        .test(
          'char-or-number',
          () => `только буквы и цифры`,
          (value) => value == null || /^[а-яА-Яa-zA-Z0-9]+$/.test(value),
        )
        .max(30, 'макс. 30 символов')
        .required('обязательное поле'),
    ),
    radio: yup.string().required('обязательное поле'),
    checkbox: yup.array().min(1, 'обязательное поле'),

    about: yup
      .string()
      .min(2, 'Поле обязательно к заполнению')
      .max(200, 'Максимум 200 символов'),
  });

  const form = useForm({
    initialValues: {
      nickname: 'Romeo',
      name: 'Roman',
      sername: 'Romanov',
      sex: 'man',

      advantages: ['oil', '34', '3433'],
      checkbox: [
        { value: 1, status: true },
        { value: 2, status: false },
        { value: 3, status: true },
      ],
      radio: '3',

      about: '',
    },

    validate: yupResolver(validateSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    // debugger;
    console.log(values);
    dispatch(setDataForms(values));
    dispatch(formATh());
  };

  // STEPs
  const nextStep = () => {
    // console.log(form.values);
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });
  };
  const prevStep = () => {
    if (active === 0) {
      return navigate('/');
    }
    setActive((prev) => prev - 1);
  };

  // Advantages
  const fields = form.values.advantages.map((_, index) => (
    <Group key={index} mt="xs">
      <TextInput
        style={{ width: '300px', height: '44px' }}
        placeholder="Placeholder"
        {...form.getInputProps(`advantages.${index}`)}
      />
      <ActionIcon color="red" onClick={() => form.removeListItem('advantages', index)}>
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  // Checkbox
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

  // console.log(form.values);

  return (
    <Box maw={680} p={'60px 0 80px 110px'}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {/*<form onSubmit={form.onSubmit((values) => console.log(values))}>*/}
        <Stepper active={active}>
          {/*// 1 - Nickname...*/}
          <Stepper.Step>
            <TextInput
              mt="65px"
              style={{ width: '300px', height: '44px' }}
              label="Nickname"
              placeholder="Nickname"
              {...form.getInputProps('nickname')}
            />
            <TextInput
              mt="50px"
              style={{ width: '300px', height: '44px' }}
              label="Name"
              placeholder="name"
              {...form.getInputProps('name')}
            />
            <TextInput
              mt="50px"
              style={{ width: '300px', height: '44px' }}
              label="Sername"
              placeholder="Sername"
              {...form.getInputProps('sername')}
            />
            <Select
              mt="50px"
              style={{ width: '300px', height: '44px' }}
              label="Sex"
              placeholder="Не выбрано"
              data={['man', 'woman']}
              {...form.getInputProps('sex')}
            />
          </Stepper.Step>
          {/*// 2 - Advantages*/}
          <Stepper.Step>
            <Group mt="65px" style={{ display: 'block' }}>
              <Text fw={500} size="sm">
                Advantages
              </Text>
              {fields}
            </Group>
            <Group justify="flex-start" mt="md">
              <Button onClick={() => form.insertListItem('advantages', '')}>+</Button>
            </Group>
            <Group mt="25px" style={{ display: 'block' }}>
              <Text fw={500} size="sm">
                Checkbox group
              </Text>
              {checkboxField}
            </Group>
            <Group mt="25px" style={{ display: 'block' }}>
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
          {/*// 3 - About*/}
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
          {active === 2 ? (
            <Button type="submit">Отправить</Button>
          ) : (
            <Button onClick={nextStep}>Далее</Button>
          )}
        </Group>
      </form>
    </Box>
  );
};
