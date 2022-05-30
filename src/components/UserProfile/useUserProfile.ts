import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";

import { RootStore, useAppDispatch } from "../../redux/store";
import {
  clearState,
  getUserProfile,
} from "../../redux/reducers/userProfileSlice";
import {
  onLeavePageClear,
  setUserId,
} from "../../redux/reducers/messagesSlice";

const isNumber = (id: string) => /^\d+$/.test(id);

export const useUserProfile = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [isBadId, setIsBadId] = useState(false);

  const userProfile = useSelector(
    (store: RootStore) => store.userProfileReducer.userProfile,
    isEqual
  );

  const isUserProfileLoading = useSelector(
    (store: RootStore) => store.userProfileReducer.isUserProfileLoading,
    isEqual
  );

  const isUserNotFoundError = useSelector(
    (store: RootStore) => store.userProfileReducer.isUserNotFoundError,
    isEqual
  );

  useEffect(() => {
    if (id && isNumber(id)) {
      dispatch(getUserProfile(Number(id)));
      dispatch(setUserId(Number(id)));
    } else if (id && !isNumber(id)) {
      setIsBadId(true);
    }
    return () => {
      dispatch(clearState());
      dispatch(setUserId(undefined));
      dispatch(onLeavePageClear());
    };
  }, [dispatch, id]);

  return {
    isEmptyStateVisible: isBadId || isUserNotFoundError,
    isUserProfileLoading,
    userProfile,
  };
};
