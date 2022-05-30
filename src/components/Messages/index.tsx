import React from "react";
import { Divider, Empty, Input, List, Typography } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchOutlined } from "@ant-design/icons";

import { AntSpinner } from "../common/AntSpinner/AntSpinner";
import { TextInputModal } from "../common/TextInputModal";
import { useMessages } from "./useMessages";
import { MessageItem } from "./MessageItem";

import styles from "./styles.module.sass";

const { Text } = Typography;

const MessagesNotFound: React.FC = () => <Text>Messages not found</Text>;

const EndListMessage: React.FC<{ isDividerHidden: boolean }> = ({
  isDividerHidden,
}) => {
  if (isDividerHidden) {
    return <></>;
  } else {
    return <Divider plain>It is all, nothing more messages 🤐</Divider>;
  }
};

export const Messages: React.FC = () => {
  const {
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
  } = useMessages();

  return (
    <>
      <div className={styles.messagesWrapper}>
        <div className={styles.messagesContainer}>
          <div className={styles.searchSection}>
            <Input
              onChange={onSearchHandler}
              placeholder="Search by messages"
              prefix={<SearchOutlined />}
            />
          </div>

          <div className={styles.messageList}>
            <InfiniteScroll
              style={{ overflowY: "hidden" }}
              dataLength={messages.length}
              next={nextPage}
              hasMore={!isAllMessagesLoaded}
              loader={<></>}
              endMessage={
                <EndListMessage
                  isDividerHidden={
                    (isAllMessagesLoaded && isMessagesLoading) ||
                    isEmptyStateVisible
                  }
                />
              }
              scrollableTarget="scrollableDiv"
            >
              <List
                locale={{ emptyText: " " }}
                dataSource={messages}
                renderItem={(message) => (
                  <List.Item key={message.id}>
                    <MessageItem
                      messageDate={message.createdAt}
                      text={message.text}
                      userAvatar={message.user.imgUrl}
                      userId={message.user.id}
                      userName={message.user.name}
                    />
                  </List.Item>
                )}
              />

              {isEmptyStateVisible && (
                <div className={styles.emptyState}>
                  <Empty description={<MessagesNotFound />} />
                </div>
              )}

              {isPaginationSpinnerVisible && <AntSpinner />}
            </InfiniteScroll>
          </div>
        </div>
      </div>

      <TextInputModal
        closeModal={closeCreateMessageModal}
        confirmButtonTitle={"Send"}
        isSubmitting={isMessageSending}
        onConfirm={onConfirmAddMessageModal}
        onTextChange={onChangeModalTextValue}
        textValue={newMessageTextValue}
        title={"Sending new message"}
        visible={isCreateMessageMode}
      />
    </>
  );
};
