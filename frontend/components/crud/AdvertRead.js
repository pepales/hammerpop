import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import moment from 'moment';
import { getCookie, isAuth } from '../../actions/authActions';
import { list, removeAdvert } from '../../actions/advertActions';

const AdvertRead = ({ username }) => {
  const [adverts, setadverts] = useState([]);
  const [message, setMessage] = useState('');
  const token = getCookie('token');

  useEffect(() => {
    loadAdverts();
    // eslint-disable-next-line
  }, []);

  const loadAdverts = () => {
    list(username).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setadverts(data);
      }
    });
  };

  const deleteAdvert = slug => {
    removeAdvert(slug, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadAdverts();
      }
    });
  };

  const deleteConfirm = slug => {
    let answer = window.confirm('Are you sure you want to delete your advert?');
    if (answer) {
      deleteAdvert(slug);
    }
  };

  const showUpdateButton = advert => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/${advert.slug}`}>
          <a className="btn btn-sm btn-warning">Update</a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${advert.slug}`}>
          <a className="ml-2 btn btn-sm btn-warning">Update</a>
        </Link>
      );
    }
  };

  const showAllAdverts = () => {
    return adverts.map((advert, i) => {
      return (
        <div key={i} className="pb-5">
          <h3>{advert.title}</h3>
          <p className="mark">
            Written by {advert.postedBy.username} | Published on{' '}
            {moment(advert.updatedAt).fromNow()}
          </p>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteConfirm(advert.slug)}
          >
            Delete
          </button>
          {showUpdateButton(advert)}
        </div>
      );
    });
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          {message && <div className="alert alert-warning">{message}</div>}
          {showAllAdverts()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdvertRead;
