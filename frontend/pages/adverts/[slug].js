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
      <Link href="/tags/[slug]" as={`/tags/${t.slug}`} key={i}>
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
                <Link
                  href="/profile/[username]"
                  as={`/profile/${advert.postedBy.username}`}
                >
                  <a>{advert.postedBy.username}</a>
                </Link>
              </div>
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
                  <span className="badge badge-pill badge-warning float-right">
                    <b>{advert.adtype}</b>
                  </span>
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
