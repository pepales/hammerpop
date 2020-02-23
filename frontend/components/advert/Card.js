import React from 'react';
import Link from 'next/link';
import { API } from '../../config';

const Card = ({ advert }) => {
  const showAdvertTags = advert =>
    advert.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="badge badge-pill badge-light ml-1">#{t.name}</a>
      </Link>
    ));

  return (
    <React.Fragment>
      <div className="card m-2" style={{ width: '18rem' }}>
        <img
          className="card-img-top"
          src={`${API}/advert/photo/${advert.slug}`}
          alt={advert.title}
        />
        <div className="card-header">
          <h3>
            <span className="badge badge-pill badge-success float-left">
              {advert.price}€
            </span>
            {advert.adtype === 'sell' && (
              <span className="badge badge-pill badge-info float-right">
                <b>{advert.adtype}</b>
              </span>
            )}
            {advert.adtype === 'buy' && (
              <span className="badge badge-pill badge-danger float-right">
                <b>{advert.adtype}</b>
              </span>
            )}
          </h3>
        </div>

        <div className="card-body">
          <h5 className="card-title">
            <Link href={`/adverts/${advert.slug}`}>
              <a>
                <h3 className="font-weight-bold">{advert.title}</h3>
              </a>
            </Link>
          </h5>
          <p className="card-text">{showAdvertTags(advert)}</p>
          <hr />
          <p className="text-truncate">{advert.description}</p>
          <Link href={`/adverts/${advert.slug}`}>
            <a className="btn btn-secondary pt-2">Read more</a>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
