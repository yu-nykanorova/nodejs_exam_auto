import { store } from "../store.ts";
import { useDispatch } from "react-redux";

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();