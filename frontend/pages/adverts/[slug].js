import React, { useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import Layout from '../../components/Layout';
import { singleAdvert } from '../../actions/advertActions';
import { API } from '../../config';

const SingleAdvert = ({ advert }) => {
  const showAdvertCategories = advert =>
    advert.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));

  const showAdvertTags = advert =>
    advert.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));

  return (
    <React.Fragment>
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: '-30px' }}>
                  <img
                    src={`${API}/advert/photo/${advert.slug}`}
                    alt={advert.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>

              <section>
                <p className="lead mt-3 mark">
                  Written by {advert.postedBy.name} | Published{' '}
                  {moment(advert.updatedAt).fromNow()}
                </p>

                <div className="pb-3">
                  {showAdvertCategories(advert)}
                  {showAdvertTags(advert)}
                  <br />
                  <br />
                </div>
              </section>
            </div>

            <div className="container">
              <section>
                <div className="col-md-12 lead">{advert.description}</div>
              </section>
            </div>

            <div className="container">
              <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
              <hr />
              <p>show related blogs</p>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

SingleAdvert.getInitialProps = ({ query }) => {
  return singleAdvert(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { advert: data };
    }
  });
};

export default SingleAdvert;
