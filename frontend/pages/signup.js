import React from 'react';
import Layout from '../components/Layout';
import SignupComponent from '../components/auth/SignupComponent';

const Signup = () => {
  return (
    <Layout>
      <div className="container">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-left pt-4 pb-4">Sign up</h2>
          <SignupComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
