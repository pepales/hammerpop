const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const anunciosRoutes = require('./routes/anuncios');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
// app

const app = express();

// db
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.info('DB connected'));

mongoose.connection.on('error', function(err) {
  // eslint-disable-next-line no-console
  console.error('mongodb connection error:', err);
  process.exit(1);
});

// middlewares

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// cors if we are in development mode we use cors
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middleware

app.use('/api', anunciosRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});
