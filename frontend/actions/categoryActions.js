import fetch from 'isomorphic-unfetch';
import { API } from '../config';

export const create = (category, token) => {
  return (
    fetch(`${API}/category`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
      .then(response => {
        return response.json();
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  );
};

export const getCategories = async () => {
  return await fetch(`${API}/categories`, {
    method: 'GET',
  })
    .then(response => {
      return response.json();
    })
    // eslint-disable-next-line no-console
    .catch(err => console.log(err));
};

export const singleCategory = slug => {
  return (
    fetch(`${API}/category/${slug}`, {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  );
};

export const removeCategory = (slug, token) => {
  return (
    fetch(`${API}/category/${slug}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        return response.json();
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  );
};