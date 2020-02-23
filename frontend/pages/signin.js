import React from 'react';
import Layout from '../components/Layout';
import SigninComponent from '../components/auth/SigninComponent';

const Signin = () => {
  return (
    <Layout>
      <div className="container mb-10">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-left pt-4 pb-4">Sign in</h2>
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
