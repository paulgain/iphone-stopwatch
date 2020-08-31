import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TimeFormatter from '../time/TimeFormatter';
import Time from '../time/Time';
import styles from '../assets/styles/TimerPanel.scss';

const TimerPanel = ({ time }) => (
  <div className={styles.container}>
    <span className={
      classNames({
        hours: time >= Time.ONE_HOUR
      })
    }
    >
      {TimeFormatter.format(time)}
    </span>
  </div>
);

TimerPanel.propTypes = {
  time: PropTypes.number.isRequired
};

export default TimerPanel;
