import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { messagesDataGetter } from "../helpers/messagesDataGeter";
import { MessageList } from "../../api/interfaces";
import { MessageAPI } from "../../api/fakeApi";
import { PayloadAction } from "../interfaces";
import { RootStore } from "../store";

const LIMIT = 5;
const FAKE_DELAY = 500;

const emptyString = "";

interface InitialState {
  list: MessageList;
  newMessageText: string;
  isMessagesLoading: boolean;
  isMessagesNotFoundError: boolean;
  isCreateMessageMode: boolean;
  isMessageSending: boolean;
  query?: string;
  offset: number;
  limit: number;
  userId?: number;
}

const initialState: InitialState = {
  list: {
    items: [],
    totalCount: 0,
  },
  isMessagesLoading: false,
  isMessagesNotFoundError: false,
  newMessageText: emptyString,
  isCreateMessageMode: false,
  isMessageSending: false,
  offset: 0,
  limit: LIMIT,
  query: undefined,
  userId: undefined,
};

export const nextMessagesQuery = createAsyncThunk(
  "messages/nextMessagesQuery",
  async (_, { getState }) => {
    const store = getState() as RootStore;
    const { query, userId, offset, limit } = store.messageReducer;

    return await messagesDataGetter({
      query,
      userId,
      limit,
      offset,
      fakeDelay: FAKE_DELAY,
    });
  }
);

export const nextMessagesPage = createAsyncThunk(
  "messages/nextMessagesPage",
  async (_, { getState }) => {
    const store = getState() as RootStore;
    const { query, userId, offset, limit } = store.messageReducer;

    return await messagesDataGetter({
      query,
      userId,
      limit,
      offset,
      fakeDelay: FAKE_DELAY,
    });
  }
);

export const sendNewMessage = createAsyncThunk(
  "messages/sendNewMessage",
  async (_, { getState }) => {
    const store = getState() as RootStore;
    const { newMessageText } = store.messageReducer;
    const { id } = store.authReducer.currentUserProfile!;

    return await MessageAPI.sendMessage(newMessageText, id, FAKE_DELAY);
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    setNewMessageText: (state, action: PayloadAction<string>) => {
      state.newMessageText = action.payload;
    },

    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },

    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },

    setUserId: (state, action: PayloadAction<number | undefined>) => {
      state.userId = action.payload;
    },

    setCreateMessageMode: (
      state: InitialState,
      action: PayloadAction<boolean>
    ) => {
      state.isCreateMessageMode = action.payload;
    },

    onLeavePageClear: (state, action: PayloadAction<undefined>) => {
      state.offset = 0;
      state.query = undefined;
      state.userId = undefined;
      state.list.items.length = 0;
      state.list.totalCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(nextMessagesQuery.pending, (state, action) => {
      state.list.items.length = 0;
      state.list.totalCount = 0;
      state.isMessagesLoading = true;
    });
    builder.addCase(nextMessagesQuery.fulfilled, (state, action) => {
      state.list.items = action.payload.response?.items || [];
      state.list.totalCount = action.payload.response?.totalCount!;
      state.isMessagesNotFoundError = !!action.payload.message;
      state.isMessagesLoading = false;
    });
    builder.addCase(nextMessagesQuery.rejected, (state, error) => {
      state.isMessagesLoading = false;
    });

    builder.addCase(nextMessagesPage.pending, (state, action) => {
      state.isMessagesLoading = true;
    });
    builder.addCase(nextMessagesPage.fulfilled, (state, action) => {
      const newMessages = action.payload.response?.items || [];
      state.list.items.push(...newMessages);
      state.list.totalCount = action.payload.response?.totalCount!;
      state.isMessagesNotFoundError = !!action.payload.message;
      state.isMessagesLoading = false;
    });
    builder.addCase(nextMessagesPage.rejected, (state, error) => {
      state.isMessagesLoading = false;
    });

    builder.addCase(sendNewMessage.pending, (state, action) => {
      state.isMessageSending = true;
    });
    builder.addCase(sendNewMessage.fulfilled, (state, action) => {
      state.newMessageText = emptyString;
      state.isMessageSending = false;
      state.isCreateMessageMode = false;
    });
  },
});

export const {
  setNewMessageText,
  setCreateMessageMode,
  setQuery,
  setOffset,
  setUserId,
  onLeavePageClear,
} = messagesSlice.actions;
export default messagesSlice.reducer;
