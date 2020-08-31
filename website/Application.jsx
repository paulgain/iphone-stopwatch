import React from 'react';
import Stopwatch from '../src/component/Stopwatch';
import styles from './Application.scss';

const Application = () => (
  <>
    <div className={styles.header} />
    <div className={styles.content}>
      <Stopwatch />
    </div>
    <div className={styles.footer} />
  </>
);

export default Application;
