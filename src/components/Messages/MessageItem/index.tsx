import React, { useCallback } from "react";
import classNames from "classnames";
import { Typography } from "antd";
import dayjs from "dayjs";

import { useNavigateHelpers } from "../../../common/hooks/useNavigateHelpers";
import { DateTemplates } from "../../../common/helpers/dateTemplates";
import { UserAvatar } from "../../common/UserAvatar";

import styles from "./styles.module.sass";

const { Text } = Typography;

interface PostItemProps {
  messageDate: string;
  text: string;
  userAvatar: string;
  userId: number;
  userName: string;
}

export const MessageItem: React.FC<PostItemProps> = ({
  messageDate,
  text,
  userAvatar,
  userId,
  userName,
}) => {
  const { goToProfile, isAllMessagesPage } = useNavigateHelpers();

  const goToProfileHandler = useCallback(() => {
    isAllMessagesPage && goToProfile(userId);
  }, [userId, isAllMessagesPage, goToProfile]);

  return (
    <div className={styles.messageWrapper}>
      <div className={styles.avatar}>
        <UserAvatar
          userAvatarUrl={userAvatar}
          onClick={goToProfileHandler}
          pointer={isAllMessagesPage}
          size={55}
        />
      </div>
      <div className={styles.messageData}>
        <div className={styles.messageCreateInfo}>
          <Text
            className={classNames(styles.userName, {
              [styles.pointer]: isAllMessagesPage,
            })}
            onClick={goToProfileHandler}
          >
            {userName}
          </Text>
          <Text className={styles.messageDate}>
            {dayjs(messageDate).format(DateTemplates.FORMAT_DAY_YEAR_TIME)}
          </Text>
        </div>
        <div>
          <Text className={styles.messageText}>{text}</Text>
        </div>
      </div>
    </div>
  );
};
