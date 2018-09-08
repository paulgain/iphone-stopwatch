import React from 'react';
import PropTypes from 'prop-types';
import EVENT_TYPE from '../event/EventType';
import Button from './Button';
import '../assets/styles/ButtonPanel.scss';

const createButton = (text, classNames, onButtonClick, disabled = false) => (
  <Button
    text={text}
    disabled={disabled}
    classNames={classNames}
    onButtonClick={onButtonClick}
  />
);

const ButtonPanel = ({ eventType, onButtonClick }) => {
  let leftButton;
  let rightButton;

  switch (eventType) {
    case EVENT_TYPE.RESET:
      leftButton = createButton('Lap', '', onButtonClick, true);
      rightButton = createButton('Start', 'start', onButtonClick);
      break;
    case EVENT_TYPE.START:
      leftButton = createButton('Lap', 'reset', onButtonClick);
      rightButton = createButton('Stop', 'stop', onButtonClick);
      break;
    case EVENT_TYPE.STOP:
      leftButton = createButton('Reset', 'reset', onButtonClick);
      rightButton = createButton('Start', 'start', onButtonClick);
      break;
    default: throw new Error(`Unknown event type: ${eventType}`);
  }

  return (
    <div styleName="container">
      { leftButton }
      { rightButton }
    </div>
  );
};

ButtonPanel.propTypes = {
  eventType: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default ButtonPanel;
