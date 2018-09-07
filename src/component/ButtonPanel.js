import React from 'react';
import PropTypes from 'prop-types';
import EVENT_TYPE from '../event/EventType';
import Button from './Button';
import '../assets/styles/ButtonPanel.scss';

const createButton = (text, disabled, classNames, onButtonClick) => (
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
      leftButton = createButton('Lap', true, '', onButtonClick);
      rightButton = createButton('Start', false, 'start', onButtonClick);
      break;
    case EVENT_TYPE.START:
      leftButton = createButton('Lap', false, 'reset', onButtonClick);
      rightButton = createButton('Stop', false, 'stop', onButtonClick);
      break;
    case EVENT_TYPE.STOP:
      leftButton = createButton('Reset', false, 'reset', onButtonClick);
      rightButton = createButton('Start', false, 'start', onButtonClick);
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
