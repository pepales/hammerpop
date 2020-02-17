import React from 'react';
// import renderHTML from 'react-render-html';
import Layout from '../../components/Layout';
import { listAdvertsWithCategoriesAndTags } from '../../actions/advertActions';
import Card from '../../components/advert/Card';

const Adverts = ({ adverts, categories, tags, size }) => {
  const showAllAdverts = () => {
    return adverts.map((advert, i) => {
      // ()
      return (
        <article key={i}>
          <Card advert={advert} />
          <hr />
        </article>
      );
    });
  };

  return (
    <Layout>
      <main>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center">
                Compra Plástico
              </h1>
            </div>
            <section>
              <p>show categories and tags</p>
            </section>
          </header>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">{showAllAdverts()}</div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

Adverts.getInitialProps = () => {
  return listAdvertsWithCategoriesAndTags().then(data => {
    if (data.error) {
      // eslint-disable-next-line no-console
      console.log(data.error);
    } else {
      return {
        adverts: data.adverts,
        categories: data.categories,
        tags: data.tags,
        size: data.size,
      };
    }
  });
};

export default Adverts;
