import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { listAdvertsWithCategoriesAndTags } from '../../actions/advertActions';
import Card from '../../components/advert/Card';

// eslint-disable-next-line prettier/prettier
const Adverts = ({ adverts, tags, totalAdverts, advertsLimit, advertSkip, router }) => {

  const [limit, setLimit] = useState(advertsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalAdverts);
  const [loadedAdverts, setloadedAdverts] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    listAdvertsWithCategoriesAndTags(toSkip, limit).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setloadedAdverts([...loadedAdverts, ...data.adverts]);
        setSize(data.size);
        setSkip(toSkip);
        console.log('que sale', data.size);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-outline-secondary btn-lg">
          Load more
        </button>
      )
    );
  };

  const showAllAdverts = () => {
    return adverts.map((advert, i) => {
      // ()
      return (
        <article key={i}>
          <Card advert={advert} />
        </article>
      );
    });
  };

  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link href="/tags/[slug]" as={`/tags/${t.slug}`} key={i}>
        <a className="btn btn-secondary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };

  const showLoadedAdverts = () => {
    return loadedAdverts.map((advert, i) => (
      <article key={i}>
        <Card advert={advert} />
      </article>
    ));
  };

  return (
    <Layout>
      <main>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center">
                Adverts {totalAdverts}
              </h1>
            </div>
            <section>
              <div className="pb-5 text-center">{showAllTags()}</div>
            </section>
          </header>
        </div>
        <div className="container-fluid text-center">
          <div className="d-flex flex-row p-2 flex-wrap justify-content-center">
            {showAllAdverts()}
          </div>
          <div className="d-flex flex-row p-2 flex-wrap justify-content-center">
            {showLoadedAdverts()}
          </div>
          <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
        </div>
      </main>
    </Layout>
  );
};

Adverts.getInitialProps = async () => {
  let skip = 0;
  let limit = 2;
  return await listAdvertsWithCategoriesAndTags().then(data => {
    if (data.error) {
      // eslint-disable-next-line no-console
      console.log(data.error);
    } else {
      return {
        adverts: data.adverts,
        tags: data.tags,
        totalAdverts: data.size,
        advertsLimit: limit,
        advertSkip: skip,
      };
    }
  });
};

export default Adverts;
