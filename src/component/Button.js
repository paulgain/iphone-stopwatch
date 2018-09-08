import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/Button.scss';

const Button = ({
  text,
  disabled,
  classNames,
  onButtonClick
}) => (
  <button
    type="button"
    name={text}
    disabled={disabled}
    styleName={classNames}
    onClick={onButtonClick}
  >
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  classNames: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default Button;
