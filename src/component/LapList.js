import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LapItem from './LapItem';
import EVENT_TYPE from '../event/EventType';
import { slowestLapTime, fastestLapTime } from '../helper/LapTimes';
import '../assets/styles/LapList.scss';

const createListOfLapTimes = (lapTimes) => {
  const reversedLapTimes = [...lapTimes].reverse();

  let slowest = { id: null };
  let fastest = { ...slowest };

  if (reversedLapTimes.length >= 2) {
    slowest = slowestLapTime(reversedLapTimes);
    fastest = fastestLapTime(reversedLapTimes);
  }

  return reversedLapTimes.map((item, index) => (
    <LapItem
      key={item.id}
      lapTime={item.lapTime}
      lapNumber={lapTimes.length - index}
      className={classNames({
        slowest: item.id === slowest.id,
        fastest: item.id === fastest.id
      })}
    />
  ));
};

const LapList = ({ eventType, listTime, lapTimes }) => {
  if (eventType === EVENT_TYPE.RESET) {
    return <div styleName="container backgroundLines" />;
  }

  return (
    <div styleName={
      classNames('container', {
        backgroundLines: lapTimes.length <= 3,
        borderLines: lapTimes.length > 3
      })
    }
    >
      <LapItem
        lapTime={listTime}
        lapNumber={lapTimes.length + 1}
      />
      { createListOfLapTimes(lapTimes) }
    </div>
  );
};

LapList.propTypes = {
  eventType: PropTypes.string.isRequired,
  listTime: PropTypes.number.isRequired,
  lapTimes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LapList;
