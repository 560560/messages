import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { isEqual, startsWith } from "lodash";
import { useLocation } from "react-router-dom";

import { getCurrentUserProfile } from "../../redux/reducers/authSlice";
import { setCreateMessageMode } from "../../redux/reducers/messagesSlice";
import { RootStore, useAppDispatch } from "../../redux/store";
import {
  RoutePath,
  useNavigateHelpers,
} from "../../common/hooks/useNavigateHelpers";

export const useHeader = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { goToProfile, isAllMessagesPage } = useNavigateHelpers();

  const isBackToMessageVisible = location.pathname !== RoutePath.MAIN_PAGE;
  const isAddMessageButtonVisible = isAllMessagesPage;

  const getHeaderTitle = useCallback(() => {
    if (startsWith(location.pathname, RoutePath.USER_PROFILE_PAGE)) {
      return "User profile";
    } else if (isAllMessagesPage) {
      return "All messages";
    } else {
      return "Oops...";
    }
  }, [location, RoutePath, isAllMessagesPage]);

  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  const isCurrentUserProfileLoading = useSelector(
    (store: RootStore) => store.authReducer.isCurrentUserProfileLoading,
    isEqual
  );

  const currentUser = useSelector(
    (store: RootStore) => store.authReducer.currentUserProfile,
    isEqual
  );

  const openCreateMessageModal = useCallback(() => {
    dispatch(setCreateMessageMode(true));
  }, [dispatch]);

  const userAvatarUrl = useMemo(() => currentUser?.imgUrl, [currentUser]);

  return {
    headerTitle: getHeaderTitle(),
    isBackToMessageVisible,
    isCurrentUserProfileLoading,
    isAddMessageButtonVisible,
    openCreateMessageModal,
    userAvatarUrl,
    goToProfileHandler: () => goToProfile(currentUser?.id),
  };
};
