# hammerpop
Hammerpop is my final project for the Keepcoding Fullstack Web Development Bootcamp (VII edition).

Deployed project:
https://www.cavernworld.com/


Some of the main features of this web application:

* Single Page Application written in MERN Stack (Mongoose, Express, React Next JS and Node)
* Responsive design using flexbox. And several components from bootstrap and reactstrap
* API secured with json web token authentication.
* Usage of mongodb as the database.

# DEPENDENCIES

Frontend:

        "@zeit/next-css": "^1.0.1",
        "file-loader": "^5.0.2",
        "isomorphic-unfetch": "^3.0.0",
        "js-cookie": "^2.2.1",
        "moment": "^2.24.0",
        "next": "^9.2.1",
        "next-images": "^1.3.0",
        "prop-types": "^15.7.2",
        "query-string": "^6.11.0",
        "react": "^16.12.0",
        "react-dom": "^16.12.0",
        "react-icons": "^3.9.0",
        "reactstrap": "^8.4.1",
        "url-loader": "^3.0.0",
        "webpack": "^4.41.5"
Backend:

        "@sendgrid/mail": "^6.5.3",
        "body-parser": "^1.19.0",
        "cookie-parser": "^1.4.4",
        "cors": "^2.8.5",
        "dotenv": "^8.2.0",
        "express": "^4.17.1",
        "express-jwt": "^5.3.1",
        "express-validator": "^6.3.1",
        "formidable": "^1.2.1",
        "i18n": "^0.8.5",
        "jsonwebtoken": "^8.5.1",
        "lodash": "^4.17.15",
        "lodash.merge": "^4.6.2",
        "mongoose": "^5.8.11",
        "morgan": "^1.9.1",
        "nodemailer": "^6.4.3",
        "nodemon": "^2.0.2",
        "shortid": "^2.2.15",
        "slugify": "^1.3.6",
        "string-strip-html": "^4.3.15"
        
# DEPLOYMENT

Download the repository:

https://github.com/pepales/hammerpop.git

Install dependencies
Install all the required npm packages both in backend and frontend folders:

\hammerpop\backend\npm install
\hammerpop\frontend\npm install

# ENV VARIABLES

BACKEND

* NODE_ENV = development
* PORT = 8000
* CLIENT_URL = http://localhost:3000
* APP_NAME = hammerpop
* DATABASE_LOCAL = 'mongodb://localhost:27017/hammerpop'
* MONGO_URI=mongodb+srv://user:VmWsRhqjOAsfRkur@nodeapi-rgpvl.mongodb.net/NodeApi?retryWrites=true&w=majority
* JWT_SECRET = lajfalh32480uqgjkfms939393fjakñsfn3i34981aksdoqpwkdowqkKAODKAOEKEKLÑALDKL!!)·)DKA
* SENDGRID_API_KEY = API_KEY (you should create a sendgrid account and generate an api key)
* EMAIL_TO = email
* EMAIL_FROM = email
* JWT_RESET_PASSWORD = UnCWwqtU8Paxs9XMXvKV9TjLky


FRONTEND

Create a next.config.js file and type the following code:
// --------------

const withImages = require('next-images');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(
  withImages({
    publicRuntimeConfig: {
      APP_NAME: 'hammerpop',
      API_DEVELOPMENT: 'http://localhost:8000/api',
      API_PRODUCTION: 'http://localhost:8000/api',
      PRODUCTION: false,
      DOMAIN_DEVELOPMENT: 'http://localhost:3000',
      DOMAIN_PRODUCTION: 'http://localhost:3000',
    },
  })
);

---------------//
# WEBSITE USERS

* User admin ----
        username: admin@email.com
        password: 123456
* User user1 ----
        username: user1@email.com
        password: 123456
* User user2 ----
        username: user2@email.com
        password: 123456
        

# START APLICATION

\hammerpop\backend\npm start

-------------------

\hammerpop\frontend\npm run dev


# NOTES

<aside class="warning">
If you use ad-blocker it might be the adverts images won't load.
</aside> 
