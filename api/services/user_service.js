//db module
const dbModule = require('../db');
const pool = dbModule.getPool();

module.exports = {
  createUser: (user, callback) => {
    dbModule.open(pool, (con) => {
      con.query(
        'INSERT INTO users (id, name, hash, salt) VALUES (?, ?, ?, ?)',
        [user.id, user.name, user.hash, user.salt],
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
  getUserById: (id, callback) => {
    dbModule.open(pool, (con) => {
      con.query('SELECT * FROM users WHERE id=?', [id], (error, result) => {
        if (error) {
          callback(error);
        } else {
          callback(null, result);
        }
      });
    });
  },
};
