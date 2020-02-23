import React from 'react';
import Layout from '../../components/Layout';
import { listSearch } from '../../actions/advertActions';
import Card from '../../components/advert/Card';

const Searched = ({ adverts, totalAdverts }) => {
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
              <h1 className="display-4 font-weight-bold text-center">Search</h1>
            </div>
            <section>
              <div className="pb-5 text-center">
                <h3>{totalAdverts} adverts found </h3>
                <br />
              </div>
            </section>
          </header>
        </div>
        <div className="container-fluid text-center">
          <div className="d-inline-flex flex-row p-2 flex-wrap justify-content-center">
            {showAllAdverts()}
          </div>
        </div>
      </main>
    </Layout>
  );
};

Searched.getInitialProps = async search => {
  let searched = search.query;
  let skip = 0;
  let limit = 10;
  return await listSearch(searched, skip, limit).then(data => {
    if (data.error) {
      // eslint-disable-next-line no-console
      console.log(data.error);
    } else {
      return {
        adverts: data.adverts,
        totalAdverts: data.size,
      };
    }
  });
};

export default Searched;
