import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { User } from "../../api/interfaces";
import { UsersAPI } from "../../api/fakeApi";
import { PayloadAction } from "../interfaces";

interface InitialState {
  isUserNotFoundError: boolean;
  userProfile: User | undefined;
  isUserProfileLoading: boolean;
}

const initialState: InitialState = {
  isUserNotFoundError: false,
  userProfile: undefined,
  isUserProfileLoading: false,
};

export const getUserProfile = createAsyncThunk(
  "userProfile/getUserProfile",
  async (userId: number) => {
    return await UsersAPI.getUser(userId, 500);
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: initialState,
  reducers: {
    clearState(state, action: PayloadAction<undefined>) {
      state.isUserNotFoundError = false;
      state.userProfile = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state, action) => {
      state.isUserProfileLoading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload.response;
      state.isUserNotFoundError = !!action.payload.message;
      state.isUserProfileLoading = false;
    });
  },
});

export const { clearState } = userProfileSlice.actions;
export default userProfileSlice.reducer;
