import React, { useState, useEffect } from 'react';
import { getCookie } from '../../actions/authActions';
// eslint-disable-next-line prettier/prettier
import { create, getCategories, removeCategory } from '../../actions/categoryActions';
import { checkString } from '../../actions/checkform';

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
    check: false,
  });

  const { name, error, success, categories, removed, reload, check } = values;
  const token = getCookie('token');

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        // eslint-disable-next-line no-console
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
          onClick={() => deleteConfirm(c.slug)}
          title="click to delete"
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
          type="button"
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
          removed: true,
          reload: !reload,
        });
      }
    });
  };

  const clickSubmit = e => {
    e.preventDefault();
    // console.log('create category', name);
    if (checkString(name)) {
      setValues({ ...values, check: true });
    } else {
      create({ name }, token).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            error: false,
            success: true,
            reload: !reload,
          });
        }
      });
    }
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

  const showCheck = () => {
    if (check) {
      return (
        <React.Fragment>
          <p className="text-danger">
            You can&apos;t create an empty category
            <button onClick={removeMsg} type="button">
              X
            </button>
          </p>
        </React.Fragment>
      );
    }
  };

  const removeMsg = () => {
    setValues({
      ...values,
      error: false,
      success: false,
      removed: false,
      check: false,
    });
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
      {showCheck()}
      {newCategoryForm()}
      {showCategories()}
    </React.Fragment>
  );
};

export default Category;
