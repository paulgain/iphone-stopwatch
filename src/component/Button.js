import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/Button.scss';

const Button = ({
  text,
  disabled,
  className,
  onButtonClick
}) => (
  <button
    type="button"
    name={text}
    disabled={disabled}
    className={className}
    onClick={onButtonClick}
  >
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default Button;
