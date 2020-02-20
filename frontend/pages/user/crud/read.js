import React from 'react';
import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import AdvertRead from '../../../components/crud/AdvertRead';
import { isAuth } from '../../../actions/authActions';

const AdvertList = () => {
  const username = isAuth() && isAuth().username;
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage blogs</h2>
            </div>
            <div className="col-md-12">
              <AdvertRead username={username} />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default AdvertList;
