import { store } from "../store.ts";
import { useSelector } from "react-redux";

export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();