const db = require('../db_connection.js');

const authGetUser = userId => db.query('SELECT username FROM users WHERE username = $1', [userId]);

const authPostUser = (user, avatar, alias) => {
  db.query('INSERT INTO users (user, avatar, alias) VALUES ($1, $2, $3)', [user, avatar, alias]);
};

module.exports = { authGetUser, authPostUser };
