import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Admin Dashboard</h2>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/category-tag">
                    <a>Create Categories and Tags</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/crud/advert">
                    <a>Create Advert</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/crud/adverts">
                    <a>Update/Delete Advert</a>
                  </Link>
                </li>

                <li className="list-group-item">
                  <a href="/user/update">Update profile</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
