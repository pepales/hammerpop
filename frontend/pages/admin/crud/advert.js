import React from 'react';
import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import AdvertCreate from '../../../components/crud/Advert';

const Advert = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Create a new advert</h2>
            </div>
            <div className="col-md-6">
              <AdvertCreate />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Advert;
