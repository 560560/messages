import React from 'react';
import { Divider } from 'antd';

export const EndListMessage = React.memo<{ isDividerHidden: boolean }>(({ isDividerHidden }) => {
  if (isDividerHidden) {
    return <></>;
  } else {
    return <Divider plain>It is all, nothing more messages 🤐</Divider>;
  }
});
