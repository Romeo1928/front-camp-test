import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Text,
  TextInput,
} from '@mantine/core';
import { FC } from 'react';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { setDataForms } from 'app/formsSlice';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useAppDispatch } from 'app/hooks';
import { validateMainFormSchema } from 'utils/yup/validateSchema';
import { avatar, container, inputNumber, linksStyle } from './mainFormStyles';
import { links } from 'configs/links';
import { ROUTES } from 'utils/enum/routes';

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
    navigate(ROUTES.STEP);
    dispatch(setDataForms(values));
  };

  return (
    <Container style={container}>
      <Box mb="25px">
        <Flex>
          <Box style={avatar}>
            <Text size="40px">РР</Text>
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
        </Flex>
      </Box>

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
