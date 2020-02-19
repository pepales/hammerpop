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
