import React, { useMemo } from 'react';
import classNames from 'classnames';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';

import styles from './styles.module.sass';

interface UserAvatarProps {
  isLoading?: boolean;
  onClick?: () => void;
  pointer?: boolean;
  size: number;
  userAvatarUrl: string | undefined;
}

export const UserAvatar = React.memo<UserAvatarProps>(
  ({ isLoading, onClick, pointer, size, userAvatarUrl }) => {
    const isEmptyAvatarVisible = !isLoading && !Boolean(userAvatarUrl);
    const isUserAvatarVisible = !isLoading && Boolean(userAvatarUrl);
    const style = useMemo(() => ({ width: size, height: size }), [size]);

    return (
      <div
        className={classNames(styles.userAvatarWrapper, {
          [styles.pointer]: pointer,
        })}
        style={style}
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
  }
);
