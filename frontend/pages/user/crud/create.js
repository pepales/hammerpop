import React from 'react';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import Advert from '../../../components/crud/Advert';

const CreateBlog = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Publish a new advert</h2>
            </div>
            <div className="col-md-12">
              <Advert />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default CreateBlog;
