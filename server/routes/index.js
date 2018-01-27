const express = require('express');

const router = express.Router();
const passport = require('passport');
const path = require('path');
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
    console.log('req.user in /success', req.user);
    authGetUser(req.user)
      .then((userArr) => {
        userArr.length ? res.redirect('/homepage') : res.redirect('/signup');
      })
      .catch((err) => {
        console.log('err', err);
        res.redirect('/');
      });
  },
);

router.get('/signup', (req, res) => {
  console.log();
  console.log('req in /signup', req.user);
  res.set('Content-Type', 'text/html');
  res.sendFile(path.join(`${__dirname}/../view/signup.html`));
});

router.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});
module.exports = router;
