import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { formAPI, IForm } from '../api/form.api.ts';
import { RootState } from 'app/store.ts';

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

    advantages: ['', '', ''],
    checkbox: [
      { value: 1, status: false },
      { value: 2, status: false },
      { value: 3, status: false },
    ],
    radio: '',
    about: '',
  },
};

// Создаем slice формы с помощью createSlice
const formsSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // подreducer
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
    const formData = (getState() as RootState).forms.forms;
    try {
      return formAPI.form(formData);
    } catch (err) {
      rejectWithValue(err);
    }
  },
);

// Создаем reducer с помощью formsSlice
export const formsReducer = formsSlice.reducer;

// Создаем actions на основе reducers из среза формы (лучше деструктуризацией)
export const { setDataForms } = formsSlice.actions;

export const formsActions = formsSlice.actions;
