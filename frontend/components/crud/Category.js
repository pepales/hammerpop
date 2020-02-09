import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/authActions';
// eslint-disable-next-line prettier/prettier
import { create, getCategories, removeCategory } from '../../actions/categoryActions';

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie('token');

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const showCategories = () => {
    return categories.map((c, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(c.slug)}
          title="Double click to delete"
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
          type="submit"
        >
          {c.name}
        </button>
      );
    });
  };

  const deleteConfirm = slug => {
    let answer = window.confirm(
      'Are you sure you want to delete this category?'
    );
    if (answer) {
      deleteCategory(slug);
    }
  };

  const deleteCategory = slug => {
    // console.log('delete', slug);
    removeCategory(slug, token).then(data => {
      if (data.error) {
        // eslint-disable-next-line no-console
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: '',
          removed: true,
          reload: true,
        });
      }
    });
  };

  const clickSubmit = e => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('RECARGANDOOOO', reload);
    // console.log('create category', name);
    create({ name }, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          removed: false,
          reload: true,
        });
      }
    });
  };

  const handleChange = name => e => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      removed: '',
    });
  };

  const showSuccess = () => {
    if (success) {
      return (
        <React.Fragment>
          <p className="text-success">
            Category is created
            <button onClick={removeMsg} type="button">
              X
            </button>
          </p>
        </React.Fragment>
      );
    }
  };

  const showError = () => {
    if (error) {
      return (
        <React.Fragment>
          <p className="text-danger">
            Category already exist
            <button onClick={removeMsg} type="button">
              X
            </button>
          </p>
        </React.Fragment>
      );
    }
  };

  const showRemoved = () => {
    if (removed) {
      return (
        <React.Fragment>
          <p className="text-danger">
            Category is removed
            <button onClick={removeMsg} type="button">
              X
            </button>
          </p>
        </React.Fragment>
      );
    }
  };

  const removeMsg = () => {
    setValues({ ...values, error: false, success: false, removed: '' });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted" htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            className="form-control"
            onChange={handleChange('name')}
            onFocus={removeMsg}
            value={name}
            required
          />
        </label>
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );

  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      {newCategoryForm()}
      {showCategories()}
    </React.Fragment>
  );
};

export default Category;
