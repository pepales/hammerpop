import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Layout from '../components/Layout';
import Subsection from '../components/Subsection';
import { listAdvertsWithCategoriesAndTags } from '../actions/advertActions';

const Index = ({ tags }) => {
  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link href="/tags/[slug]" as={`/tags/${t.slug}`} key={i}>
        <a className="btn btn-secondary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };
  return (
    <Layout>
      <div className="col-md-12 pt-3">
        <p className="font-weight-lighter text-center">
          hammerpop, the largest wargames buy and sell platform online. You can
          find every plastic bit you wouldn't find elsewhere!!
        </p>
        <h5 className="display-4 font-weight-bold text-center">
          Gods of war are calling you
        </h5>
      </div>
      <section>
        <div className="pb-5 text-center">{showAllTags()}</div>
      </section>
      <section className="bg-dark mb-5">
        <div className="size-responsive50 m-auto">
          <Subsection />
        </div>
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

Index.propTypes = {
  tags: PropTypes.object,
};
