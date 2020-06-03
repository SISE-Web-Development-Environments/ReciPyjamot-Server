require('dotenv').config();
// #region express configures
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('client-sessions');

const app = express();
app.use(logger('dev')); // logger
app.use(express.json()); // parse application/json
app.use(
  session({
    cookieName: 'session', // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 20 * 60 * 1000, // expired after 20 sec
    activeDuration: 0, // if expiresIn < activeDuration,
    // the session will be extended by activeDuration milliseconds
  }),
);
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public'))); // To serve static files such as images, CSS files, and JavaScript files

const port = process.env.PORT || '3000';
// #endregion
const auth = require('./modules/routes/authentication');
const user = require('./modules/routes/user');
const recipes = require('./modules/routes/recipes');

app.use('/recipes', recipes);
app.use('/auth', auth);
app.use('/user', user);

const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

process.on('SIGINT', () => {
  if (server) {
    server.close(() => console.log('server closed'));
  }
  process.exit();
});
