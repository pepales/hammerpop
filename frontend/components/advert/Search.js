import React, { useState } from 'react';
import Router, { withRouter } from 'next/router';

const Search = () => {
  const searchFromLS = () => {
    if (typeof window === 'undefined') {
      return '';
    }

    if (localStorage.getItem('search')) {
      return localStorage.getItem('search');
    } else {
      return '';
    }
  };

  const [values, setValues] = useState({
    search: searchFromLS(),
    price: 0,
    adtype: '',
    message: '',
  });

  const { search, message, price, adtype } = values;

  const searchSubmit = e => {
    e.preventDefault();
    if (!search) {
      setValues({
        ...values,
        message: `Search bar is empty please type any word to search`,
      });
    } else {
      setValues({
        ...values,
        price: 200,
        adtype: 'buy',
        message: false,
      });
      Router.push({
        pathname: `/searched`,
        query: { search: search, price: price, adtype: adtype },
      });
    }
  };

  const handleChange = e => {
    setValues({
      ...values,
      search: e.target.value,
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('search', e.target.value);
    }
  };

  const removeMsg = () => {
    setValues({
      ...values,
      message: false,
    });
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <div className="row">
        <div className="col-md-8">
          <input
            type="search"
            className="form-control"
            placeholder="Search adverts"
            onChange={handleChange}
            onFocus={removeMsg}
            value={search}
          />
        </div>

        <div className="col-md-4">
          <button className="btn btn-block btn-outline-primary" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="pt-3 pb-2">{searchForm()}</div>

        {message && <p className="alert alert-danger w-25">{message}</p>}
      </div>
    </React.Fragment>
  );
};

export default withRouter(Search);

Search.getInitialProps = async () => {
  return {};
};
