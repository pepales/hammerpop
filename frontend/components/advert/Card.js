import React from 'react';
import Link from 'next/link';
import moment from 'moment';
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
            <span className="badge badge-pill badge-warning float-right">
              <b>{advert.adtype}</b>
            </span>
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
            <a className="btn btn-primary pt-2">Read more</a>
          </Link>
        </div>
      </div>
      {/* <div className="card pb-4">
      <header>
        <Link href={`/adverts/${advert.slug}`}>
          <a>
            <h2 className="pt-3 pb-3 font-weight-bold">{advert.title}</h2>
          </a>
        </Link>
      </header>
      <section>
        <p className="mark ml-1 pt-2 pb-2">
          Written by{' '}
          <Link href={`/profile/${advert.postedBy.username}`}>
            <a>{advert.postedBy.username}</a>
          </Link>{' '}
          | Published {moment(advert.updatedAt).fromNow()}
        </p>
      </section>
      <section>
        {showAdvertCategories(advert)}
        {showAdvertTags(advert)}
        <br />
        <br />
      </section>

      <div className="row">
        <div className="col-md-4">
          <section>
            <img
              className="img img-fluid"
              style={{ maxHeight: '150px', width: 'auto' }}
              src={`${API}/advert/photo/${advert.slug}`}
              alt={advert.title}
            />
          </section>
        </div>
        <div className="col-md-8">
          <section>
            <div className="pb-3">{advert.description}</div>
            <Link href={`/adverts/${advert.slug}`}>
              <a className="btn btn-primary pt-2">Read more</a>
            </Link>
          </section>
        </div>
      </div>
    </div> */}
    </React.Fragment>
  );
};

export default Card;
