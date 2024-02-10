import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.sbercloud.ru/',
});

export const formAPI = {
  submitForm(data: IForm) {
    return instance.post('content/v1/bootcamp/frontend', data);
  },
};

export interface IForm {
  phone: string;
  email: string;

  nickname: string;
  name: string;
  sername: string;
  sex: string;

  advantages: { name: string; key: string }[];
  checkbox: { value: number; status: boolean }[];
  radio: string;

  about: string;
}
