import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment';
import Layout from '../../components/Layout';
import { singleAdvert, listRelated } from '../../actions/advertActions';
import { API } from '../../config';
import SmallCard from '../../components/advert/SmallCard';
import ContactForm from '../../components/form/ContactForm';

const SingleAdvert = ({ advert }) => {
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelated({ advert }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
    // eslint-disable-next-line
  }, []);

  const showAdvertTags = advert =>
    advert.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-secondary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));

  const showRelatedAdvert = () => {
    return related.map((advert, i) => (
      <div className="p-2" key={i}>
        <article>
          <SmallCard advert={advert} />
        </article>
      </div>
    ));
  };

  return (
    <React.Fragment>
      <Layout>
        <div className="mt-5">
          <div className="d-flex flex-row justify-content-center">
            <div className="card mr-5" style={{ width: '24rem' }}>
              <div className="card-body">
                Posted {moment(advert.updatedAt).fromNow()} by{' '}
                <Link href={`/profile/${advert.postedBy.username}`}>
                  <a>{advert.postedBy.username}</a>
                </Link>
              </div>
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
                <p>{advert.description}</p>
              </div>
            </div>
            <div style={{ width: '20rem' }}>
              <h3>Send {advert.postedBy.username} a message</h3>
              <ContactForm />
            </div>
          </div>
          <h4 className="text-center pt-5 pb-5 h2">Related Adverts</h4>
          <div className="d-flex flex-row justify-content-center">
            {showRelatedAdvert()}
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

SingleAdvert.getInitialProps = ({ query }) => {
  return singleAdvert(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { advert: data, query };
    }
  });
};

export default SingleAdvert;

{
  /* <main>
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
                  Written by{' '}
                  <Link href={`/profile/${advert.postedBy.username}`}>
                    <a>{advert.postedBy.username}</a>
                  </Link>{' '}
                  | Published {moment(advert.updatedAt).fromNow()}
                </p>

                <div className="pb-3">
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
            </div> */
}
