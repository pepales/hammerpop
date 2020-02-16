import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Router, { withRouter } from 'next/router';

import { getCookie, isAuth } from '../../actions/authActions';
import { getCategories } from '../../actions/categoryActions';
import { getTags } from '../../actions/tagActions';
import { createAdvert } from '../../actions/advertActions';

const CreateAdvert = ({ router }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checked, setChecked] = useState([]); // categories
  const [checkedTag, setCheckedTag] = useState([]); // tags
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    description: '',
    hidePublishButton: false,
  });

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    description,
    hidePublishButton,
  } = values;

  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
    // eslint-disable-next-line
  }, [router]);

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
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

  const publishAdvert = e => {
    e.preventDefault();
    // console.log('ready to publishBlog');
    createAdvert(formData, token).then(data => {
      if (data.error) {
        console.log('QUE TENEMOS', data.error);
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          error: '',
          success: `A new advert titled "${data.title}" is created`,
        });
        setCategories([]);
        setTags([]);
      }
    });
  };

  const handleChange = name => e => {
    // console.log(e.target.value);
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const handleToggle = c => () => {
    setValues({ ...values, error: '' });
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setChecked(all);
    formData.set('categories', all);
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

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleToggle(c._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleTagsToggle(t._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  const createAdvertForm = () => {
    return (
      <form onSubmit={publishAdvert}>
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
          {createAdvertForm()}
          <hr />
          {JSON.stringify(title)}
          <hr />
          {JSON.stringify(categories)}
          <hr />
          {JSON.stringify(tags)}
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
            <h5>Categories</h5>
            <hr />

            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showCategories()}
            </ul>
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

export default withRouter(CreateAdvert);
