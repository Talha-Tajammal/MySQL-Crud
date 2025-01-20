const connection = require('../config/database');

const createUser = (user, callback) => {
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  connection.query(query, [user.name, user.email], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

const getUsers = (callback) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = {
  createUser,
  getUsers
};