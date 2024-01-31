import * as yup from 'yup';
import { StepActive } from '../enum.ts';

export const validateMainFormSchema = yup.object().shape({
  phone: yup.string().required('Обязательное поле'),
  email: yup.string().email('Invalid email').required('Обязательное поле'),
});
export const validateFormsSchema = (active: StepActive) => {
  if (active === StepActive.Step1) {
    return yup.object().shape({
      nickname: yup
        .string()
        .test(
          'char-or-number',
          () => `только буквы и цифры`,
          (value) => value == null || /^[а-яА-Яa-zA-Z0-9]+$/.test(value),
        )
        .max(30, 'max 30 символов')
        .required('Обязательное поле'),
      name: yup
        .string()
        .test(
          'only char',
          () => `только буквы`,
          (value) => value == null || /^[а-яА-Яa-zA-Z]+$/.test(value),
        )
        .max(50, 'max 50 символов')
        .required('Обязательное поле'),
      sername: yup
        .string()
        .test(
          'only char',
          () => `только буквы`,
          (value) => value == null || /^[а-яА-Яa-zA-Z]+$/.test(value),
        )
        .max(50, 'макс. 50 символов')
        .required('Обязательное поле'),
      sex: yup.mixed().oneOf(['man', 'woman'], 'выберите пол'),
    });
  } else if (active === StepActive.Step2) {
    return yup.object().shape({
      advantages: yup
        .array()
        .of(
          yup.object().shape({
            name: yup
              .string()
              .max(30, 'макс. 30 символов')
              .matches(/^[а-яА-Яa-zA-Z0-9]+$/, 'char-or-number')
              .required('Обязательное поле'),
            key: yup.string(),
          }),
        )
        .max(30, 'Максимальное количество элементов в массиве 30'),
      radio: yup.string().required('Обязательное поле'),
      checkbox: yup
        .array()
        .of(
          yup.object().shape({
            value: yup.number(),
            status: yup.boolean(),
          }),
        )
        .test(
          'at-least-one-true',
          'Хотя бы один элемент должен быть true',
          function (values) {
            if (values) {
              return values.some((el) => el.status);
            }
            return false;
          },
        )
        .required('Хотя бы один элемент должен быть выбран'),
    });
  } else if (active === StepActive.Step3) {
    return yup.object().shape({
      about: yup.string().min(2, 'Обязательное поле').max(200, 'Максимум 200 символов'),
    });
  }
  // Возвращаем схему по умолчанию, если active не соответствует ни одному из условий
  return yup.object().shape({});
};
