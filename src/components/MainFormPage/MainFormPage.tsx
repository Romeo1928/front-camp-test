import {
  Anchor,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  List,
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
    <Container ml="110px" mt="60px">
      <Box mb="25px">
        <Flex>
          <Avatar color="#212830" size="lg" radius="xl" mr="25px">
            РР
          </Avatar>
          <Box>
            <Text fw="500" size="20px" mb="8px">
              Роман Романов
            </Text>
            <List display="flex">
              {links.map((link) => (
                <List.Item
                  style={{
                    listStyleType: 'none',
                    marginRight: '20px',
                  }}
                  key={link.id}
                >
                  <Flex justify="center" align="center">
                    <Image src={link.icon} w="14px" h="12px" alt="icon" mr="2.5px" />
                    <Anchor href={link.href} target="_blank">
                      {link.text}
                    </Anchor>
                  </Flex>
                </List.Item>
              ))}
            </List>
          </Box>
        </Flex>
      </Box>

      <Box maw={400}>
        <Divider my="md" />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            mb="25px"
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
