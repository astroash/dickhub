const express = require('express');

const router = express.Router();
const passport = require('passport');
const { authGetUser } = require('../database/queries/auth-queries.js');

router.get(
  '/auth',
  passport.authenticate('github', { failureRedirect: '/fail' }),
  (req, res) => {},
);

router.get(
  '/success',
  passport.authenticate('github', { failureRedirect: '/fail' }),
  (req, res) => {
    authGetUser(req.user)
      .then(console.log) // need to check if response is empty and create a user if needed
      .catch(console.log);
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

router.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});
module.exports = router;
