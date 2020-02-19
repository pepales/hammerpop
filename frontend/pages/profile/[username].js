import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import Layout from '../../components/Layout';
import { userPublicProfile } from '../../actions/userActions';
import { API } from '../../config';

const UserProfile = ({ user, adverts, query }) => {
  const showUserBlogs = () => {
    return adverts.map((blog, i) => {
      return (
        <div className="mt-4 mb-4" key={i}>
          <Link href={`/adverts/${blog.slug}`}>
            <a className="lead">{blog.title}</a>
          </Link>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5>{user.name}</h5>
                  <Link href={`${user.profile}`}>
                    <a>View Profile</a>
                  </Link>
                  <p className="text-muted">
                    Joined {moment(user.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="container pb-5">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white">
                    Recent adverts by {user.name}
                  </h5>

                  {showUserBlogs()}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light">
                    Message {user.name}
                  </h5>
                  <br />
                  <p>contact form</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

UserProfile.getInitialProps = ({ query }) => {
  // console.log(query);
  return userPublicProfile(query.username).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
      return { user: data.user, adverts: data.adverts, query };
    }
  });
};

export default UserProfile;
