import React from 'react';
import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import AdvertUpdate from '../../../components/crud/AdvertUpdate';

const Advert = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Update an advert</h2>
            </div>
            <div className="col-md-6">
              <AdvertUpdate />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Advert;
