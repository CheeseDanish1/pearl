require('dotenv').config({path: `${__dirname}/.env`});
require('./strats/discord');

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const Store = require('connect-mongo')(session);

const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true,
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://web.postman.co',
      'http://localhost:5000',
    ],
    credentials: true,
  })
);

app.use(
  session({
    secret: '0a586e92-7eea-4a70-8b68-533e8367fd54',
    cookie: {
      maxAge: 60000 * 60 * 24 * 7,
    },
    resave: false,
    saveUninitialized: false,
    store: new Store({mongooseConnection: mongoose.connection}),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
