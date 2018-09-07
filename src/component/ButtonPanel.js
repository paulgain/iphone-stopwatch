import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import EVENT_TYPE from '../event/EventType';
import '../assets/styles/ButtonPanel.scss';

const ButtonPanel = ({ eventType, onButtonClick }) => {
  const button = {
    leftText: EVENT_TYPE.LAP,
    rightText: EVENT_TYPE.START,
    disabled: false
  };

  const leftBtnStyles = {};
  const rightBtnStyles = {};

  switch (eventType) {
    case EVENT_TYPE.RESET:
      button.disabled = true;
      rightBtnStyles.start = true;
      break;
    case EVENT_TYPE.START:
      button.rightText = EVENT_TYPE.STOP;
      leftBtnStyles.reset = true;
      rightBtnStyles.stop = true;
      break;
    case EVENT_TYPE.STOP:
      button.leftText = EVENT_TYPE.RESET;
      button.rightText = EVENT_TYPE.START;
      leftBtnStyles.reset = true;
      rightBtnStyles.start = true;
      break;
    default:
      throw new Error(`Unknown event type: ${eventType}`);
  }

  return (
    <div styleName="container">
      <button
        type="button"
        styleName={classNames(leftBtnStyles)}
        name={button.leftText}
        disabled={button.disabled}
        onClick={onButtonClick}
      >
        {button.leftText}
      </button>
      <button
        type="button"
        styleName={classNames(rightBtnStyles)}
        name={button.rightText}
        disabled={false}
        onClick={onButtonClick}
      >
        {button.rightText}
      </button>
    </div>
  );
};

ButtonPanel.propTypes = {
  eventType: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default ButtonPanel;
