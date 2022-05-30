import React from "react";

import styles from "./styles.module.sass";

export const Oops: React.FC = () => {
  return (
    <div className={styles.pageNotFound}>
      <div>404</div>
      <div>Page not found</div>
    </div>
  );
};
