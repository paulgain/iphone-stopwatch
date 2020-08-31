import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TimeFormatter from '../time/TimeFormatter';
import '../assets/styles/LapItem.scss';

class LapItem extends PureComponent {
  render() {
    const { lapNumber, lapTime, className } = this.props;
    return (
      <dl>
        <dt className={className}>
          {`Lap ${lapNumber}`}
        </dt>
        <dd className={className}>
          {TimeFormatter.format(lapTime)}
        </dd>
      </dl>
    );
  }
}

LapItem.defaultProps = {
  className: ''
};

LapItem.propTypes = {
  lapNumber: PropTypes.number.isRequired,
  lapTime: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default LapItem;
