import { combineReducers } from "redux";
import { baseApi } from "./api/baseApi";
import ShowDetailsReducer from "./slice/ShowDetailsSlice";



export const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  ShowDetailsReducer,
});

export type RootState = ReturnType<typeof reducer>;
