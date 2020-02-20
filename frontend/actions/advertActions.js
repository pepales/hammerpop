import fetch from 'isomorphic-unfetch';
import queryString from 'query-string';
import { API } from '../config';
import { isAuth } from './authActions';

export const createAdvert = (advert, token) => {
  let createAdvertEndpoint;

  if (isAuth() && isAuth().role === 1) {
    createAdvertEndpoint = `${API}/advert`;
  } else if (isAuth() && isAuth().role === 0) {
    createAdvertEndpoint = `${API}/user/advert`;
  }
  return (
    fetch(`${createAdvertEndpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: advert,
    })
      .then(response => {
        return response.json();
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  );
};

export const listAdvertsWithCategoriesAndTags = (skip, limit) => {
  const data = {
    limit,
    skip,
  };
  return (
    fetch(`${API}/advert-categories-tags`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json();
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  );
};

export const singleAdvert = slug => {
  return (
    fetch(`${API}/advert/${slug}`, {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  );
};

export const listRelated = advert => {
  return (
    fetch(`${API}/adverts/related`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(advert),
    })
      .then(response => {
        return response.json();
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  );
};

export const list = username => {
  let listAdvertEndpoint;

  if (username) {
    listAdvertEndpoint = `${API}/${username}/adverts`;
  } else {
    listAdvertEndpoint = `${API}/adverts`;
  }

  return (
    fetch(`${listAdvertEndpoint}`, {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  );
};

export const removeAdvert = (slug, token) => {
  let deleteAdvertEndpoint;

  if (isAuth() && isAuth().role === 1) {
    deleteAdvertEndpoint = `${API}/advert/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    deleteAdvertEndpoint = `${API}/user/advert/${slug}`;
  }
  return (
    fetch(`${deleteAdvertEndpoint}`, {
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

export const updateAdvert = (advert, token, slug) => {
  let updateAdvertEndpoint;

  if (isAuth() && isAuth().role === 1) {
    updateAdvertEndpoint = `${API}/advert/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    updateAdvertEndpoint = `${API}/user/advert/${slug}`;
  }
  return (
    fetch(`${updateAdvertEndpoint}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: advert,
    })
      .then(response => {
        return response.json();
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  );
};

export const listSearch = params => {
  // eslint-disable-next-line no-console
  console.log('search params', params);
  let query = queryString.stringify(params);
  // eslint-disable-next-line no-console
  console.log('query params', query);
  return (
    fetch(`${API}/adverts/search?${query}`, {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  );
};
