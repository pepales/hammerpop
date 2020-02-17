import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { API } from '../../config';

const SmallCard = ({ advert }) => {
  return (
    <div className="card">
      <section>
        <Link href={`/blogs/${advert.slug}`}>
          <a>
            <img
              className="img img-fluid"
              style={{ maxHeight: 'auto', width: '100%' }}
              src={`${API}/advert/photo/${advert.slug}`}
              alt={advert.title}
            />
          </a>
        </Link>
      </section>

      <div className="card-body">
        <section>
          <Link href={`/blogs/${advert.slug}`}>
            <a>
              <h5 className="card-title">{advert.title}</h5>
            </a>
          </Link>
          <p className="card-text">{advert.description}</p>
        </section>
      </div>

      <div className="card-body">
        Posted {moment(advert.updatedAt).fromNow()} by{' '}
        <Link href="/">
          <a className="float-right">{advert.postedBy.name}</a>
        </Link>
      </div>
    </div>
  );
};

export default SmallCard;
