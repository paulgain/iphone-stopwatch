import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TimeFormatter from '../time/TimeFormatter';
import '../assets/styles/LapItem.scss';

class LapItem extends PureComponent {
  render() {
    const { lapNumber, lapTime, className } = this.props;
    return (
      <dl>
        <dt styleName={className}>
          {`Lap ${lapNumber}`}
        </dt>
        <dd styleName={className}>
          {TimeFormatter.format(lapTime)}
        </dd>
      </dl>
    );
  }
}

LapItem.propTypes = {
  lapNumber: PropTypes.number.isRequired,
  lapTime: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired
};

export default LapItem;
