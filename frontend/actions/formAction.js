import fetch from 'isomorphic-unfetch';
import { API } from '../config';

export const emailContactForm = data => {
  let emailEndpoint;

  if (data.authorEmail) {
    emailEndpoint = `${API}/contact-advert-author`;
  } else {
    emailEndpoint = `${API}/contact`;
  }

  return (
    fetch(`${emailEndpoint}`, {
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
