const session = require('express-session');
const PgSessionStore = require('connect-pg-simple')(session);
require('dotenv').config();

module.exports = session({
  name: 'sid',
  store: new PgSessionStore({
    conString:
      process.env.NODE_ENV === 'production'
        ? process.env.DB_URL_PROD
        : process.env.DB_URL_DEV,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 10,
  },
});

