import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import styles from './styles.module.sass';

export const AntSpinner: React.FC = () => {
  return (
    <div className={styles.spinner}>
      <Spin indicator={<LoadingOutlined />} size={'large'} spinning />
    </div>
  );
};
