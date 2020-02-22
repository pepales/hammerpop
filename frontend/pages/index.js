import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { listAdvertsWithCategoriesAndTags } from '../actions/advertActions';

const Index = ({ tags }) => {
  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link href={`/tags/${t.slug}`} key={i}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };
  return (
    <Layout>
      <div className="col-md-12 pt-3">
        <p className="font-weight-lighter text-center">
          hammerpop, la plataforma de compra-venta de wargames, desde la primera
          chusta de plástico hasta el último modelo chino
        </p>
        <h2 className="display-4 font-weight-bold text-center">
          What army will be the next?
        </h2>
      </div>
      <section>
        <div className="pb-5 text-center">{showAllTags()}</div>
      </section>
    </Layout>
  );
};

export default Index;

Index.getInitialProps = async () => {
  return await listAdvertsWithCategoriesAndTags().then(data => {
    if (data.error) {
      // eslint-disable-next-line no-console
      console.log(data.error);
    } else {
      return {
        tags: data.tags,
      };
    }
  });
};
