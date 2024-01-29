import { configureStore } from '@reduxjs/toolkit';
import { formsReducer } from '../app/formsSlice.ts';

// Создали хранилище Redux с нашим срезом формы
export const store = configureStore({
  reducer: {
    forms: formsReducer,
  },
  // error in console: A non-serializable value was detected in an action, in the path: `payload.headers`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
