const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

// app

const app = express();

// middlewares

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// cors if we are in development mode we use cors
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
// routes

app.get('/api', (req, res) => {
  res.json({ time: Date().toString() });
});

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
