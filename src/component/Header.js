import React from 'react';
import '../assets/styles/Header.scss';
import signal from '../assets/img/signal.svg';
import wifi from '../assets/img/wifi.svg';
import bluetooth from '../assets/img/bluetooth.svg';
import battery from '../assets/img/battery.svg';

const Header = () => (
  <div styleName="header">
    <div styleName="carrier-and-wifi">
      <img src={signal} alt="phone signal" />
      <span>3</span>
      <img src={wifi} alt="wifi connection" />
    </div>
    <div styleName="time">
      <span>00.15</span>
    </div>
    <div styleName="bluetooth-and-battery">
      <img src={bluetooth} alt="bluetooth connection" />
      <span>25%</span>
      <img src={battery} alt="battery life" />
    </div>
    <div styleName="heading">
      <span>Stopwatch</span>
    </div>
  </div>
);

export default Header;
