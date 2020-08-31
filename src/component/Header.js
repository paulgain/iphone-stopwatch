import React from 'react';
import signal from '../assets/img/signal.svg';
import wifi from '../assets/img/wifi.svg';
import bluetooth from '../assets/img/bluetooth.svg';
import battery from '../assets/img/battery.svg';
import styles from '../assets/styles/Header.scss';

const Header = () => (
  <div className={styles.header}>
    <div className={styles.carrierAndWiFi}>
      <img src={signal} alt="phone signal" />
      <span>3</span>
      <img src={wifi} alt="wifi connection" />
    </div>
    <div className={styles.time}>
      <span>00.15</span>
    </div>
    <div className={styles.bluetoothAndBattery}>
      <img src={bluetooth} alt="bluetooth connection" />
      <span>25%</span>
      <img src={battery} alt="battery life" />
    </div>
    <div className={styles.heading}>
      <span>Stopwatch</span>
    </div>
  </div>
);

export default Header;
