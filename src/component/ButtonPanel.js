import React from 'react';
import PropTypes from 'prop-types';
import EVENT_TYPE from '../event/EventType';
import Button from './Button';
import styles from '../assets/styles/ButtonPanel.scss';
import buttonStyles from '../assets/styles/Button.scss';

const createButton = (text, className, onButtonClick, disabled = false) => (
  <Button
    text={text}
    disabled={disabled}
    className={className}
    onButtonClick={onButtonClick}
  />
);

const ButtonPanel = ({ eventType, onButtonClick }) => {
  let leftButton;
  let rightButton;

  switch (eventType) {
    case EVENT_TYPE.RESET:
      leftButton = createButton('Lap', '', onButtonClick, true);
      rightButton = createButton('Start', buttonStyles.start, onButtonClick);
      break;
    case EVENT_TYPE.START:
      leftButton = createButton('Lap', buttonStyles.reset, onButtonClick);
      rightButton = createButton('Stop', buttonStyles.stop, onButtonClick);
      break;
    case EVENT_TYPE.STOP:
      leftButton = createButton('Reset', buttonStyles.reset, onButtonClick);
      rightButton = createButton('Start', buttonStyles.start, onButtonClick);
      break;
    default: throw new Error(`Unknown event type: ${eventType}`);
  }

  return (
    <div className={styles.container}>
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
