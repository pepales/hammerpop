import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

// it depends on whether we are in production or development mode it will change

export const API = publicRuntimeConfig.PRODUCTION
  ? 'https://35.180.126.161:8000/api'
  : 'http://localhost:8000/api';

export const APP_NAME = publicRuntimeConfig.APP_NAME;
