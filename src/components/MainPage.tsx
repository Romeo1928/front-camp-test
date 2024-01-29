import { Box, Button, Group, TextInput } from '@mantine/core';
import { CSSProperties, FC } from 'react';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { setDataForms } from '../app/formsSlice';
import { yupResolver } from 'mantine-form-yup-resolver';
import * as yup from 'yup';
import { useAppDispatch } from '../app/hooks.ts';

// styles
const container: CSSProperties = {
  padding: '25px',
};
const headerContainer: CSSProperties = {
  marginBottom: '25px',
  borderBottom: '1px solid #00000014',
};
const avatar: CSSProperties = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: '#D5E4F7',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '40px',
  marginRight: '25px',
};
const inputNumber: CSSProperties = {
  marginBottom: '25px',
};
const linksStyle: CSSProperties = {
  marginLeft: '-40px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  listStyle: 'none',
};

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const links = [
    {
      icon: '',
      href: '',
      text: 'Telegram',
    },
    {
      icon: '',
      href: '',
      text: 'GitHub',
    },
    {
      icon: '',
      href: '',
      text: 'Resume',
    },
  ];

  // yup
  const validateSchema = yup.object().shape({
    phone: yup.string().required('Обязательное поле'),
    email: yup.string().required('Обязательное поле').email('Invalid email'),
  });

  const form = useForm({
    initialValues: {
      phone: '+7 (900) 000-00-00',
      email: 'example@mail.ru',
    },

    validate: yupResolver(validateSchema),
    //   validate: {
    //     phone: (value) =>
    //       /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)
    //         ? null
    //         : 'Неправильный формат номера телефона',
    //     email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    //   },
  });

  // Обработка отправки формы
  const handleSubmit = (values: typeof form.values) => {
    navigate('/step');
    dispatch(setDataForms(values));
    // console.log(values);
  };

  return (
    <div style={container}>
      <div style={headerContainer}>
        <div style={{ display: 'flex' }}>
          <div style={avatar}>
            <div>РР</div>
          </div>
          <div>
            <h2>Роман Романов</h2>
            <ul style={linksStyle}>
              {links.map((item, index) => (
                <li style={{ marginRight: '20px' }} key={index}>
                  <img src={item.icon} alt="" />
                  <a href={item.href} target="blank">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Box maw={400}>
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
    </div>
  );
};
