import { debounce, isEqual } from "lodash";
import { useSelector } from "react-redux";
import React, { useCallback, useEffect, useMemo } from "react";

import { RootStore, useAppDispatch } from "../../redux/store";
import {
  setCreateMessageMode,
  setNewMessageText,
  setQuery,
  setOffset,
  nextMessagesQuery,
  nextMessagesPage,
  sendNewMessage,
  onLeavePageClear,
} from "../../redux/reducers/messagesSlice";

export const useMessages = () => {
  const dispatch = useAppDispatch();
  const debounceDelay = 400;
  const isCreateMessageMode = useSelector(
    (state: RootStore) => state.messageReducer.isCreateMessageMode,
    isEqual
  );

  const newMessageTextValue = useSelector(
    (state: RootStore) => state.messageReducer.newMessageText,
    isEqual
  );

  const offset = useSelector(
    (state: RootStore) => state.messageReducer.offset,
    isEqual
  );

  const limit = useSelector(
    (state: RootStore) => state.messageReducer.limit,
    isEqual
  );

  const isMessageSending = useSelector(
    (state: RootStore) => state.messageReducer.isMessageSending,
    isEqual
  );

  const isMessagesLoading = useSelector(
    (state: RootStore) => state.messageReducer.isMessagesLoading,
    isEqual
  );

  const messageList = useSelector(
    (state: RootStore) => state.messageReducer.list,
    isEqual
  );

  const messages = useMemo(() => messageList.items, [messageList]);
  const totalCount = useMemo(() => messageList.totalCount, [messageList]);

  const isListVisible = !!messages.length;
  const isEmptyStateVisible = !isMessagesLoading && !isListVisible;
  const isPaginationSpinnerVisible = isMessagesLoading;
  const isAllMessagesLoaded = messages.length >= totalCount;

  const onChangeModalTextValue = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(setNewMessageText(e.target.value));
    },
    [dispatch]
  );

  const closeCreateMessageModal = useCallback(() => {
    dispatch(setCreateMessageMode(false));
  }, [dispatch]);

  const onConfirmAddMessageModal = useCallback(() => {
    dispatch(sendNewMessage()).then(() => dispatch(nextMessagesQuery()));
  }, [dispatch]);

  const nextPage = useCallback(() => {
    if (isMessagesLoading) {
      return;
    }
    dispatch(setOffset(offset + limit));
    dispatch(nextMessagesPage());
  }, [dispatch, limit, offset, isMessagesLoading]);

  const nextQuery = useCallback(() => {
    dispatch(setOffset(0));
    return dispatch(nextMessagesQuery());
  }, [dispatch]);

  const onSearchHandler = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setQuery(e.target.value));
      nextQuery();
    }, debounceDelay),
    [dispatch]
  );

  useEffect(() => {
    const promise = nextQuery();
    return () => {
      promise?.abort();
      dispatch(onLeavePageClear());
    };
  }, [nextQuery, dispatch]);

  return {
    closeCreateMessageModal,
    isAllMessagesLoaded,
    isCreateMessageMode,
    isEmptyStateVisible,
    isMessagesLoading,
    isMessageSending,
    isPaginationSpinnerVisible,
    messages,
    newMessageTextValue,
    nextPage,
    onChangeModalTextValue,
    onConfirmAddMessageModal,
    onSearchHandler,
  };
};
