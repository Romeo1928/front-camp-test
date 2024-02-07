import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { formAPI, IForm } from 'api/form.api';
import { RootState } from 'app/store';
import { randomId } from '@mantine/hooks';
import { StepActive } from 'utils/enum/stepActive';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

interface InitialStateType {
  isLoading: RequestStatusType;
  activeStep: StepActive;
  error: null | string;
  forms: IForm;
}

const initialState: InitialStateType = {
  isLoading: 'idle' as RequestStatusType,
  activeStep: StepActive.Step1,
  error: null,
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
    about: '',
  },
};

const formsSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setDataForms: (state, { payload }: PayloadAction<Partial<IForm>>) => {
      state.forms = { ...state.forms, ...payload };
    },
    setActiveStep: (state, action: PayloadAction<StepActive>) => {
      state.activeStep = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(formATh.pending, (state) => {
      state.isLoading = 'loading';
    });
    builder.addCase(formATh.fulfilled, (state) => {
      state.isLoading = 'succeeded';
    });
    builder.addCase(formATh.rejected, (state) => {
      state.isLoading = 'failed';
      state.error = 'Ошибка';
      state.activeStep = StepActive.StepError;
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
      return rejectWithValue(err);
    }
  },
);

export const getActiveStep = (state: RootState) => state.forms.activeStep;
export const getIsLoading = (state: RootState) => state.forms.isLoading;
export const getIsError = (state: RootState) => state.forms.error;

export const formsReducer = formsSlice.reducer;
export const { setDataForms, setActiveStep } = formsSlice.actions;
