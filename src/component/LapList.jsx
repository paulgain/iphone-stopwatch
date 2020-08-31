import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LapItem from './LapItem';
import EVENT_TYPE from '../event/EventType';
import { slowestLapTime, fastestLapTime } from '../helper/LapTimes';
import lapListStyles from '../assets/styles/LapList.scss';
import lapItemStyles from '../assets/styles/LapItem.scss';

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
        [lapItemStyles.slowest]: item.id === slowest.id,
        [lapItemStyles.fastest]: item.id === fastest.id
      })}
    />
  ));
};

const LapList = ({ eventType, listTime, lapTimes }) => {
  if (eventType === EVENT_TYPE.RESET) {
    return (
      <div className={
        classNames(
          lapListStyles.container,
          lapListStyles.backgroundLines
        )
      }
      />
    );
  }

  return (
    <div className={
      classNames(lapListStyles.container, {
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
