// src/components/ErrorDisplay.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './ErrorDisplay.scss';

const ErrorDisplay = ({ Error }) => {
  return (
    <div className="error-display">
      <p>{Error}</p>
    </div>
  );
};

ErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorDisplay;
