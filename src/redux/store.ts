import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import userProfileSlice from "./reducers/userProfileSlice";
import messagesSlice from "./reducers/messagesSlice";
import authSlice from "./reducers/authSlice";

const rootReducer = combineReducers({
  messageReducer: messagesSlice,
  authReducer: authSlice,
  userProfileReducer: userProfileSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootStore = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
