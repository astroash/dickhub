const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const bodyParser = require('body-parser');
const path = require('path');
const env = require('env2')('./config.env');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3001;

// our functions
const index = require('./routes/index');

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

// Github OAuth
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/success',
  },
  (accessToken, refreshToken, profile, cb) => {
    const hmac = crypto
      .createHmac('sha256', process.env.SECRET)
      .update(profile.id)
      .digest('hex');
    cb(null, hmac);
  },
));

// grabs routes from ./routes/index.js
app.use('/', index);

// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
