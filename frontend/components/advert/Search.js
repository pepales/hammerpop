import React, { useState } from 'react';
import Link from 'next/link';
import { listSearch } from '../../actions/advertActions';

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
    results: [],
    searched: false,
    message: '',
  });

  const { search, results, searched, message } = values;

  const searchSubmit = e => {
    e.preventDefault();
    listSearch({ search }).then(data => {
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data.length} adverts found`,
      });
    });
  };

  const handleChange = e => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: [],
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('search', e.target.value);
    }
  };

  const searchedAdverts = (results = []) => {
    return (
      <div className="jumbotron bg-white">
        {message && <p className="pt-4 text-muted font-italic">{message}</p>}

        {results.map((advert, i) => {
          return (
            <div key={i}>
              <Link href={`/adverts/${advert.slug}`}>
                <a className="text-primary">{advert.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    );
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
    <div className="container-fluid">
      <div className="pt-3 pb-5">{searchForm()}</div>
      {searched && (
        <div style={{ marginTop: '-120px', marginBottom: '-80px' }}>
          {searchedAdverts(results)}
        </div>
      )}
    </div>
  );
};

export default Search;
