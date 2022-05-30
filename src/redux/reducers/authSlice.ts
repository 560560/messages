import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { User } from "../../api/interfaces";
import { PayloadAction } from "../interfaces";
import { UsersAPI } from "../../api/fakeApi";
import { RootStore } from "../store";

interface InitialState {
  currentUserId: number;
  isCurrentUserProfileLoading: boolean;
  currentUserProfile: User | undefined;
}

const initialState: InitialState = {
  currentUserId: 1,
  currentUserProfile: undefined,
  isCurrentUserProfileLoading: false,
};

export const getCurrentUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { getState }) => {
    const currentUserId = (getState() as RootStore).authReducer.currentUserId;
    return await UsersAPI.getUser(currentUserId, 1000);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCurrentUserProfileLoading(state, action: PayloadAction<boolean>) {
      state.isCurrentUserProfileLoading = action.payload;
    },

    setUserProfile(
      state: InitialState,
      action: PayloadAction<User | undefined>
    ) {
      state.currentUserProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserProfile.pending, (state, action) => {
      state.isCurrentUserProfileLoading = true;
    });

    builder.addCase(getCurrentUserProfile.fulfilled, (state, action) => {
      state.currentUserProfile = action.payload.response;
      state.isCurrentUserProfileLoading = false;
    });
  },
});

export default authSlice.reducer;
