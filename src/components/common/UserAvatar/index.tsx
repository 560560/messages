import React from "react";
import classNames from "classnames";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";

import styles from "./styles.module.sass";

interface UserAvatarProps {
  isLoading?: boolean;
  onClick?: () => void;
  pointer?: boolean;
  size: number;
  userAvatarUrl: string | undefined;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  isLoading,
  onClick,
  pointer,
  size,
  userAvatarUrl,
}) => {
  const isUserAvatarVisible = !isLoading && userAvatarUrl;
  const isEmptyAvatarVisible = !isLoading && !Boolean(userAvatarUrl);

  return (
    <div
      className={classNames(styles.userAvatarWrapper, {
        [styles.pointer]: pointer,
      })}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      {isLoading && <LoadingOutlined className={styles.loader} />}

      {isUserAvatarVisible && (
        <div className={styles.userAvatar}>
          <img src={userAvatarUrl} alt="Avatar" />
        </div>
      )}

      {isEmptyAvatarVisible && <UserOutlined className={styles.emptyAvatar} />}
    </div>
  );
};
