import React, { useState, useEffect } from 'react';
import { getCookie } from '../../actions/authActions';
import { create, getTags, removeTag } from '../../actions/tagActions';
import { checkString } from '../../actions/checkform';

const Tag = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
    check: false,
  });

  const { name, error, success, tags, removed, reload, check } = values;
  const token = getCookie('token');

  useEffect(() => {
    loadTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <button
          onClick={() => deleteConfirm(t.slug)}
          title="click to delete"
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
          type="button"
        >
          {t.name}
        </button>
      );
    });
  };

  const deleteConfirm = slug => {
    let answer = window.confirm('Are you sure you want to delete this tag?');
    if (answer) {
      deleteTag(slug);
    }
  };

  const deleteTag = slug => {
    // console.log('delete', slug);
    removeTag(slug, token).then(data => {
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
            Tag is created
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
            Tag already exist
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
            Tag is removed
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
            You can&apos;t create an empty tag
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

  const newTagForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted" htmlFor="name">
          Name
          <input
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
      {newTagForm()}
      {showTags()}
    </React.Fragment>
  );
};

export default Tag;
