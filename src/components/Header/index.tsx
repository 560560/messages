import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { LeftCircleTwoTone, PlusOutlined } from "@ant-design/icons";

import { useHeader } from "./useHeader";
import { UserAvatar } from "../common/UserAvatar";

import styles from "./styles.module.sass";

export const Header: React.FC = () => {
  const {
    headerTitle,
    isBackToMessageVisible,
    isCurrentUserProfileLoading,
    isAddMessageButtonVisible,
    openCreateMessageModal,
    userAvatarUrl,
    goToProfileHandler,
  } = useHeader();

  return (
    <div className={styles.navbar}>
      <div className={styles.leftSide}>
        {isBackToMessageVisible && (
          <div className={styles.goBackWrapper}>
            <Link className={styles.link} to="/">
              <LeftCircleTwoTone className={styles.goBackIcon} />
              All messages
            </Link>
          </div>
        )}
      </div>

      <div className={styles.pageTitle}>{headerTitle}</div>

      <div className={styles.rightSide}>
        {isAddMessageButtonVisible && (
          <Button
            icon={<PlusOutlined />}
            onClick={openCreateMessageModal}
            type={"primary"}
            ghost
            shape={"round"}
          >
            Add message
          </Button>
        )}

        <UserAvatar
          userAvatarUrl={userAvatarUrl}
          isLoading={isCurrentUserProfileLoading}
          onClick={goToProfileHandler}
          size={40}
          pointer
        />
      </div>
    </div>
  );
};
