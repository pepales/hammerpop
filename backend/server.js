const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const advertsRoutes = require('./routes/adverts');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const tagRoutes = require('./routes/tag');
const formRoutes = require('./routes/form');
var publicDir = require('path').join(__dirname, '/public');
// app

const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.info('DB connected'))
  .catch(err => {
    console.log(err);
  });
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

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
// if (process.env.NODE_ENV === 'development') {
//   app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
// }

// routes middleware
app.use('/api/img', express.static(publicDir));
app.use('/api', advertsRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', tagRoutes);
app.use('/api', formRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});
