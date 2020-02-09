import React, { useEffect } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { isAuth } from '../../actions/authActions';

const Private = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push('/signin');
    }
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};

Private.propTypes = {
  children: PropTypes.node,
};

export default Private;
