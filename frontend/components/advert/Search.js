import React, { useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import { UncontrolledCollapse } from 'reactstrap';
import { FaSearchDollar } from 'react-icons/fa';
import { getTags } from '../../actions/tagActions';
import '../../css/style.css';

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
    minprice: 0,
    maxprice: 0,
    adtype: '',
    message: '',
    tags: [],
    reload: false,
    tag: '',
  });

  const {
    search,
    message,
    price,
    adtype,
    reload,
    tags,
    tag,
    minprice,
    maxprice,
  } = values;

  useEffect(() => {
    loadTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const loadTags = () => {
    getTags().then(data => {
      if (data.error) {
        // eslint-disable-next-line no-console
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  };

  const showTags = () => {
    return tags.map((t, i) => {
      return (
        <option key={i} value={t._id}>
          {t.name}
        </option>
      );
    });
  };

  const searchSubmit = e => {
    e.preventDefault();
    if (!search) {
      setValues({
        ...values,
        message: `Search bar is empty please type any word to search`,
      });
    } else if (minprice >= maxprice) {
      setValues({
        ...values,
        message: `min price can't be higher or equal to max price`,
      });
    } else if (!tag) {
      setValues({
        ...values,
        message: `choose a tag to search`,
      });
    } else if (!adtype) {
      setValues({
        ...values,
        message: `choose an ad type`,
      });
    } else {
      setValues({
        ...values,
        price: price,
        adtype: adtype,
        tag: tag,
        message: false,
      });
      Router.push({
        pathname: `/searched`,
        query: {
          search: search,
          minprice: minprice,
          maxprice: maxprice,
          adtype: adtype,
          tag: tag,
        },
      });
    }
  };

  const handleChangeLS = e => {
    setValues({
      ...values,
      search: e.target.value,
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('search', search);
    }
  };

  const handleInput = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const removeMsg = () => {
    setValues({
      ...values,
      message: false,
    });
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      {/* INPUT SEARCH */}
      <div className="row">
        <div className="col-md-8">
          <input
            type="search"
            className="form-control"
            placeholder="Search adverts"
            onChange={handleChangeLS}
            onFocus={removeMsg}
            value={search}
          />
        </div>
        {/* SUBMIT BUTTON */}
        <div className="col-md-4">
          <button className="btn btn-block btn-secondary" type="submit">
            Search
          </button>
        </div>
        {/* INPUT FILTERS */}
        <div className="col-md-4 input-group mb-3 mt-1">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="tagselect">
              Tags
            </label>
          </div>
          <select
            name="tag"
            className="custom-select"
            id="tagselect"
            onChange={handleInput}
          >
            <option defaultValue>Choose...</option>
            {showTags()}
          </select>
        </div>
        <div className="col-md-4 input-group mb-3 mt-1">
          <FaSearchDollar size="1.5em" className="m-2" />
          <input
            type="number"
            name="minprice"
            className="form-control"
            placeholder="min price"
            onChange={handleInput}
          />
          <input
            type="number"
            name="maxprice"
            className="form-control"
            placeholder="max price"
            onChange={handleInput}
          />
        </div>
        <div className="col-md-4 input-group mb-3 mt-1">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="tagselect">
              Ad type
            </label>
          </div>
          <select
            name="adtype"
            className="custom-select"
            id="adtypeselect"
            onChange={handleInput}
          >
            <option defaultValue>Choose...</option>
            <option value="buy">buy</option>
            <option value="sell">sell</option>
          </select>
        </div>
      </div>
    </form>
  );

  return (
    <React.Fragment>
      <div className="container-fluid">
        <UncontrolledCollapse toggler="#toggler">
          <div className="pt-3 pb-2">{searchForm()}</div>
        </UncontrolledCollapse>
      </div>
      {message && <p className="alert alert-danger">{message}</p>}
    </React.Fragment>
  );
};

export default withRouter(Search);

Search.getInitialProps = async () => {
  return {};
};
