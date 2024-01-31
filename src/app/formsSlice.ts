import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { formAPI, IForm } from '../api/form.api.ts';
import { RootState } from 'app/store.ts';
import { randomId } from '@mantine/hooks';

export type RequestStatusType = 'success' | 'failed';

const initialState: { isLoading: boolean; forms: IForm } = {
  isLoading: false,
  forms: {
    phone: '',
    email: '',

    nickname: '',
    name: '',
    sername: '',
    sex: '',

    advantages: [
      { name: '', key: randomId() },
      { name: '', key: randomId() },
      { name: '', key: randomId() },
    ],
    checkbox: [
      { value: 1, status: false },
      { value: 2, status: false },
      { value: 3, status: false },
    ],
    radio: '',
    about: undefined,
  },
};

// Создаем slice формы с помощью createSlice
const formsSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setDataForms: (state, { payload }: PayloadAction<Partial<IForm>>) => {
      state.forms = { ...state.forms, ...payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(formATh.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(formATh.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(formATh.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const formATh = createAsyncThunk(
  'form/formATh',
  async (_, { rejectWithValue, getState }) => {
    const formData: IForm = (getState() as RootState).forms.forms;
    try {
      return formAPI.form(formData);
    } catch (err) {
      rejectWithValue(err);
    }
  },
);

export const formsReducer = formsSlice.reducer;
export const { setDataForms } = formsSlice.actions;
