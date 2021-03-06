import fetch from 'isomorphic-unfetch';
import { API } from '../config';

export const userPublicProfile = username => {
  return (
    fetch(`${API}/user/${username}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => {
        return response.json();
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  );
};

export const getProfile = token => {
  return (
    fetch(`${API}/user/profile`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
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

export const update = (token, user) => {
  return (
    fetch(`${API}/user/update`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: user,
    })
      .then(response => {
        return response.json();
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  );
};
