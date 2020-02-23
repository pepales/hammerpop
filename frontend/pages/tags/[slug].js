import React from 'react';
import Layout from '../../components/Layout';
import { singleTag } from '../../actions/tagActions';
import Card from '../../components/advert/Card';

const Tag = ({ tag, adverts }) => {
  return (
    <React.Fragment>
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{tag.name}</h1>
                <div className="d-flex flex-row p-2 flex-wrap justify-content-center">
                  {adverts.map((advert, i) => (
                    <article key={i}>
                      <Card advert={advert} />
                    </article>
                  ))}
                </div>
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Tag.getInitialProps = ({ query }) => {
  return singleTag(query.slug).then(data => {
    if (data.error) {
      // eslint-disable-next-line no-console
      console.log(data.error);
    } else {
      return { tag: data.tag, adverts: data.adverts };
    }
  });
};

export default Tag;
