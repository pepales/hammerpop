import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import Layout from '../../components/Layout';
import { singleCategory } from '../../actions/categoryActions';
import { API } from '../../config';
import Card from '../../components/advert/Card';

const Category = ({ category, adverts }) => {
  return (
    <React.Fragment>
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{category.name}</h1>
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

Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { category: data.category, adverts: data.adverts };
    }
  });
};

export default Category;
