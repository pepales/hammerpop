import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { API } from '../../config';

const SmallCard = ({ advert }) => {
  return (
    <div className="card" style={{ width: '24rem' }}>
      <section>
        <Link href="/adverts/[slug]" as={`/adverts/${advert.slug}`}>
          <a>
            <img
              className="img img-fluid"
              style={{ maxHeight: 'auto', width: '100%' }}
              src={`${API}/img/${advert.photo}`}
              alt={advert.title}
            />
          </a>
        </Link>
      </section>

      <div className="card-body">
        <section>
          <Link href="/adverts/[slug]" as={`/adverts/${advert.slug}`}>
            <a>
              <h5 className="card-title">{advert.title}</h5>
            </a>
          </Link>
          <p className="card-text">{advert.description}</p>
        </section>
      </div>

      <div className="card-body">
        Posted {moment(advert.updatedAt).fromNow()} by{' '}
        <Link
          href="/profile/[username]"
          as={`/profile/${advert.postedBy.username}`}
        >
          <a>{advert.postedBy.username}</a>
        </Link>
      </div>
    </div>
  );
};

export default SmallCard;
