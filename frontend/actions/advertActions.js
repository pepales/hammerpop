import fetch from 'isomorphic-unfetch';
import { API } from '../config';

export const createAdvert = (advert, token) => {
  return (
    fetch(`${API}/advert`, {
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
