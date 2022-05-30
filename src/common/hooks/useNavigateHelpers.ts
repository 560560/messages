import { useLocation, useNavigate } from "react-router-dom";

export enum RoutePath {
  MAIN_PAGE = "/",
  USER_PROFILE_PAGE = "/user/",
}

export const useNavigateHelpers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToProfile = (userId: number | undefined) => {
    if (userId) {
      navigate(`${RoutePath.USER_PROFILE_PAGE}${userId}`);
    }
  };

  const isAllMessagesPage = location.pathname === RoutePath.MAIN_PAGE;

  return {
    goToProfile,
    isAllMessagesPage,
  };
};
