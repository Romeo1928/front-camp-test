import { Box, Button, Container, Divider, Group, Text, TextInput } from '@mantine/core';
import { FC } from 'react';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { setDataForms } from '../../app/formsSlice.ts';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useAppDispatch } from '../../app/hooks.ts';
import { validateMainFormSchema } from '../../utils/yup/validateSchema.ts';
import {
  avatar,
  container,
  headerContainer,
  inputNumber,
  linksStyle,
} from './mainFormStyles.ts';
import { links } from '../../configs/links.ts';

export const MainFormPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      phone: '+7 (900) 000-00-00',
      email: 'example@mail.ru',
    },

    validate: yupResolver(validateMainFormSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    navigate('/step');
    dispatch(setDataForms(values));
  };

  return (
    <Container style={container}>
      <div style={headerContainer}>
        <Box display="flex">
          <Box style={avatar}>
            <Text>РР</Text>
          </Box>
          <Box>
            <Text fw="500" size="20px">
              Роман Романов
            </Text>
            <ul style={linksStyle}>
              {links.map((el) => (
                <li style={{ marginRight: '20px' }} key={el.id}>
                  <img src={el.icon} alt="icon" style={{ marginRight: '2.5px' }} />
                  <a href={el.href} target="_blank" style={{ textDecoration: 'none' }}>
                    {el.text}
                  </a>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      </div>
      <Box maw={400}>
        <Divider my="md" />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            style={inputNumber}
            label="Номер телефона"
            placeholder="+7 999 999-99-99"
            {...form.getInputProps('phone')}
          />
          <TextInput
            label="Email"
            placeholder="tim.jennings@example.com"
            {...form.getInputProps('email')}
          />
          <Group justify="flex-start" mt="50px">
            <Button type="submit">Начать</Button>
          </Group>
        </form>
      </Box>
    </Container>
  );
};
