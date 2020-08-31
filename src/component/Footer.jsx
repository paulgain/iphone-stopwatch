import React from 'react';
import PropTypes from 'prop-types';
import bed from '../assets/img/bed.svg';
import globe from '../assets/img/globe.svg';
import alarm from '../assets/img/alarm.svg';
import timer from '../assets/img/timer.svg';
import stopWatch from '../assets/img/stop-watch.svg';
import styles from '../assets/styles/Footer.scss';

const Icon = ({ svg, text, selected }) => (
  <div className={styles.iconContainer}>
    <img src={svg} alt={text} />
    <span className={selected ? 'selected' : ''}>{text}</span>
  </div>
);

const Footer = () => (
  <div className={styles.footer}>
    <Icon svg={globe} text="World Clock" />
    <Icon svg={alarm} text="Alarm" />
    <Icon svg={bed} text="Bedtime" />
    <Icon svg={stopWatch} text="Stopwatch" selected />
    <Icon svg={timer} text="Timer" />
  </div>
);

Icon.defaultProps = {
  selected: false
};

Icon.propTypes = {
  svg: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool
};

export default Footer;
