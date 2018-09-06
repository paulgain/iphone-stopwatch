import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TimeFormatter from '../time/TimeFormatter';
import MILLISECONDS from '../time/Time';
import '../assets/styles/TimerPanel.scss';

const TimerPanel = ({ time }) => (
  <div styleName="container">
    <span styleName={classNames({ hours: time > MILLISECONDS.ONE_HOUR })}>
      {TimeFormatter.format(time)}
    </span>
  </div>
);

TimerPanel.propTypes = {
  time: PropTypes.number.isRequired
};

export default TimerPanel;
