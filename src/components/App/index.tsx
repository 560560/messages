import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from '../Header';
import { Messages } from '../Messages';
import { UserProfile } from '../UserProfile';
import { Oops } from '../common/Oops';

import styles from './styles.module.sass';

export const App: React.FC = () => {
  return (
    <div className={styles.appGrid}>
      <Header />
      <Routes>
        <Route path="/" element={<Messages />} />
        <Route path="user/:id" element={<UserProfile />} />
        <Route path="*" element={<Oops />} />
      </Routes>
    </div>
  );
};
