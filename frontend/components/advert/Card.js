import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { API } from '../../config';

const Card = ({ advert }) => {
  const showAdvertTags = advert =>
    advert.tags.map((t, i) => (
      <Link href="/tags/[slug]" as={`/tags/${t.slug}`} key={i}>
        <a className="badge badge-pill badge-light ml-1">#{t.name}</a>
      </Link>
    ));

  return (
    <React.Fragment>
      <div className="card m-2" style={{ width: '18rem' }}>
        <img
          className="card-img-top"
          src={`${API}/img/${advert.photo}`}
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
            <Link href="/adverts/[slug]" as={`/adverts/${advert.slug}`}>
              <a>
                <h3 className="font-weight-bold">{advert.title}</h3>
              </a>
            </Link>
          </h5>
          <p className="card-text">{showAdvertTags(advert)}</p>
          <hr />
          <p className="text-truncate">{advert.description}</p>
          <Link href="/adverts/[slug]" as={`/adverts/${advert.slug}`}>
            <a className="btn btn-secondary pt-2">Read more</a>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

Card.propTypes = {
  advert: PropTypes.object,
};

export default Card;
