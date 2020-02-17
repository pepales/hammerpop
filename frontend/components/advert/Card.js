import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { API } from '../../config';

const Card = ({ advert }) => {
  const showBlogCategories = advert =>
    advert.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));

  const showBlogTags = advert =>
    advert.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));

  return (
    <div className="lead pb-4">
      <header>
        <Link href={`/blogs/${advert.slug}`}>
          <a>
            <h2 className="pt-3 pb-3 font-weight-bold">{advert.title}</h2>
          </a>
        </Link>
      </header>
      <section>
        <p className="mark ml-1 pt-2 pb-2">
          Written by {advert.postedBy.name} | Published{' '}
          {moment(advert.updatedAt).fromNow()}
        </p>
      </section>
      <section>
        {showBlogCategories(advert)}
        {showBlogTags(advert)}
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
            <Link href={`/blogs/${advert.slug}`}>
              <a className="btn btn-primary pt-2">Read more</a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
