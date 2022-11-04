//db module
const dbModule = require('../db');
const pool = dbModule.getPool();

module.exports = {
  createUser: (user, callback) => {
    dbModule.open(pool, (con) => {
      con.query(
        'INSERT INTO users (user_id, name, hash, salt) VALUES (?, ?, ?, ?)',
        [user.user_id, user.name, user.hash, user.salt],
        (error) => {
          if (error) {
            callback(error);
          } else {
            callback(null);
          }
        }
      );
    });
  },
  getUserById: (user_id, callback) => {
    dbModule.open(pool, (con) => {
      con.query(
        'SELECT * FROM users WHERE user_id=?',
        [user_id],
        (error, result) => {
          if (error) {
            callback(error);
          } else {
            callback(null, result[0]);
          }
        }
      );
    });
  },
};
