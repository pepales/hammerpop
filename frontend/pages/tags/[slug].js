import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import Layout from '../../components/Layout';
import { singleTag } from '../../actions/tagActions';
import { API } from '../../config';
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
                {adverts.map((advert, i) => (
                  <div key={i}>
                    <Card advert={advert} />
                    <hr />
                  </div>
                ))}
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
      console.log(data.error);
    } else {
      return { tag: data.tag, adverts: data.adverts };
    }
  });
};

export default Tag;
