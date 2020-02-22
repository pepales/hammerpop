import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment';
import Layout from '../../components/Layout';
import { singleAdvert, listRelated } from '../../actions/advertActions';
import { API } from '../../config';
import SmallCard from '../../components/advert/SmallCard';

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
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));

  const showRelatedAdvert = () => {
    return related.map((advert, i) => (
      <div className="col-md-4" key={i}>
        <article>
          <SmallCard advert={advert} />
        </article>
      </div>
    ));
  };

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
            </div>

            <div className="container">
              <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
              <div className="row">{showRelatedAdvert()}</div>
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
      return { advert: data, query };
    }
  });
};

export default SingleAdvert;
