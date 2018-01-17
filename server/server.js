const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const bodyParser = require('body-parser');
const path = require('path');
const env = require('env2')('./config.env');

const app = express();
const PORT = process.env.PORT || 3001;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Github OAuth
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth',
  },
  ((accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({ githubId: profile.id }, (err, user) => {
      console.log('user', user);
      return cb(err, user);
    });
  }),
));

app.get('/login', passport.authenticate('github'));

app.get('/auth', passport.authenticate('github', { failureRedirect: '/login' }), (
  req,
  res,
) => {
  // Successful authentication, redirect home.
  res.redirect('/');
});

// Answer API requests.
app.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
