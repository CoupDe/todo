import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";


export const useAppDispatch = () => useDispatch<AppDispatch>(); //Типизированный диспатч
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
