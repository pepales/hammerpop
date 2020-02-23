import React, { useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/authActions';
import { getTags } from '../../actions/tagActions';
import { singleAdvert, updateAdvert } from '../../actions/advertActions';
import Timer from '../Timer';

const UpdateAdvert = ({ router }) => {
  const [tags, setTags] = useState([]);

  const [checkedTag, setCheckedTag] = useState([]); // tags
  const [values, setValues] = useState({
    error: '',
    success: '',
    formData: '',
    title: '',
    description: '',
    adtype: '',
    price: '',
  });

  const {
    error,
    success,
    formData,
    title,
    description,
    adtype,
    price,
  } = values;

  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initAdvert();
    initTags();
    // eslint-disable-next-line
  }, [router]);

  const initAdvert = () => {
    console.log('que lleva', router.query.slug);
    if (router.query.slug) {
      singleAdvert(router.query.slug).then(data => {
        if (data.error) {
          // eslint-disable-next-line
          console.log(data.error);
        } else {
          console.log('PRECIO', data.price);
          setValues({
            ...values,
            title: data.title,
            description: data.description,
            price: data.price,
            adtype: data.adtype,
          });
          setTagsArray(data.tags);
        }
      });
    }
  };

  const setTagsArray = advertTags => {
    let ta = [];
    advertTags.map((t, i) => {
      ta.push(t._id);
    });
    setCheckedTag(ta);
  };

  const initTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const handleTagsToggle = t => () => {
    setValues({ ...values, error: '' });
    // return the first index or -1
    const clickedTag = checkedTag.indexOf(t);
    const all = [...checkedTag];

    if (clickedTag === -1) {
      all.push(t);
    } else {
      all.splice(clickedTag, 1);
    }
    console.log(all);
    setCheckedTag(all);
    formData.set('tags', all);
  };

  const findOutTag = t => {
    const result = checkedTag.indexOf(t);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleTagsToggle(t._id)}
            checked={findOutTag(t._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  const handleChange = name => e => {
    // console.log(e.target.value);
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const editAdvert = e => {
    e.preventDefault();
    updateAdvert(formData, token, router.query.slug).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          success: `Advert titled "${data.title}" is successfully updated`,
        });

        window.setTimeout(() => {
          if (isAuth() && isAuth().role === 1) {
            Router.replace(`/admin/crud/read`);
          } else if (isAuth() && isAuth().role === 0) {
            Router.replace(`/user/crud/read`);
          }
        }, 1900);
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? '' : 'none' }}
    >
      {success}
      {success && <Timer countdown={2} />}
    </div>
  );

  const updateAdvertForm = () => {
    return (
      <form onSubmit={editAdvert}>
        <div className="form-group">
          <label className="text-muted" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleChange('title')}
          />
        </div>
        <div className="form-group">
          <label className="text-muted" htmlFor="description">
            Description
          </label>
          <textarea
            className="form-control"
            onChange={handleChange('description')}
            rows="4"
            value={description}
          ></textarea>
        </div>
        <div className="form-group">
          <label className="text-muted" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={handleChange('price')}
          />
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            onChange={handleChange('adtype')}
            type="radio"
            value="buy"
            checked={adtype === 'buy'}
          />
          <label className="form-check-label" htmlFor="buy">
            Buy
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            onChange={handleChange('adtype')}
            type="radio"
            value="sell"
            checked={adtype === 'sell'}
          />
          <label className="form-check-label" htmlFor="sell">
            Sell
          </label>
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Publish
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          {updateAdvertForm()}
          <div className="pt-3">
            {showSuccess()}
            {showError()}
          </div>
        </div>

        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured image</h5>
              <hr />

              <small className="text-muted">Max size: 1mb</small>
              <label className="btn btn-outline-info">
                Upload featured image
                <input
                  onChange={handleChange('photo')}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UpdateAdvert);
