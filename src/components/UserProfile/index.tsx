import React from 'react';
import { Empty } from 'antd';

import { Messages } from '../Messages';
import { UserAvatar } from '../common/UserAvatar';
import { useUserProfile } from './useUserProfile';
import { AntSpinner } from '../common/AntSpinner/AntSpinner';

import styles from './styles.module.sass';
import { UserNotFound } from './UserNotFound';

export const UserProfile = React.memo(() => {
  const { isEmptyStateVisible, isUserProfileLoading, userProfile } = useUserProfile();

  const isUserProfileVisible = !!userProfile;

  if (isUserProfileLoading) {
    return <AntSpinner />;
  }

  return (
    <div className={styles.userProfileWrapper}>
      {isEmptyStateVisible && (
        <div className={styles.emptyState}>
          <Empty description={<UserNotFound />} />
        </div>
      )}

      {isUserProfileVisible && (
        <>
          <div className={styles.userProfileContainer}>
            <div className={styles.header}>
              <div className={styles.avatar}>
                <UserAvatar userAvatarUrl={userProfile?.imgUrl} size={100} />
              </div>
              <div className={styles.userName}>{userProfile.name}</div>
            </div>
          </div>
          <Messages />
        </>
      )}
    </div>
  );
});
