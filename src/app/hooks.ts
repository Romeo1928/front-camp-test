import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// нужны для корректной работы с hooks useSelector, useDispatch
// чтобы dispatch понимал, что может быть action или thunk и определял их тип
export const useAppDispatch = () => useDispatch<AppDispatch>();
// для доступа к состоянию в компонентах
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
