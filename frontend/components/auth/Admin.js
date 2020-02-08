import React, { useEffect } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { isAuth } from '../../actions/authAction';

const Admin = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push('/signin');
    } else if (isAuth().role !== 1) {
      Router.push('/');
    }
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};

Admin.propTypes = {
  children: PropTypes.node,
};

export default Admin;
