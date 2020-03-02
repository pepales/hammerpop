import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Timer = ({ countdown }) => {
  const [values, setValues] = useState({
    seconds: countdown,
  });

  const { seconds } = values;

  setTimeout(() => {
    setValues({ seconds: seconds - 1 });
  }, 1000);

  return <h1>Redirecting in {seconds === 0 ? '' : seconds}</h1>;
};

Timer.propTypes = {
  countdown: PropTypes.number,
};

export default Timer;
