const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

//db module
const dbModule = require('../db');
const pool = dbModule.getPool();

module.exports = {
  sign: (user) => {
    const payload = {
      id: user.id,
    };

    return jwt.sign(payload, SECRET, {
      algorithm: 'HS256',
      expiresIn: '10m',
    });
  },
  verify: (token) => {
    try {
      const decoded = jwt.verify(token, SECRET);
      return {
        ok: true,
        id: decoded.id,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message,
      };
    }
  },
  refresh: () => {
    return jwt.sign({}, SECRET, {
      algorithm: 'HS256',
      expiresIn: '14d',
    });
  },
  setRefreshToken: (id, refreshToken, callback) => {
    dbModule.open(pool, (con) => {
      con.query(
        'INSERT INTO tokens (id, refresh_token) VALUES (?, ?) ON DUPLICATE KEY UPDATE id=?, refresh_token=?',
        [id, refreshToken, id, refreshToken],
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
  dropRefreshToken: (id, callback) => {
    dbModule.open(pool, (con) => {
      con.query('DELETE FROM tokens WHERE id=?', [id], (error, result) => {
        if (error) {
          callback(error);
        } else {
          callback(null);
        }
      });
    });
  },
  verifyRefresh: (id, token, callback) => {
    dbModule.open(pool, (con) => {
      con.query('SELECT * FROM tokens WHERE id=?', [id], (error, result) => {
        if (error) return callback(false);

        if (token === result[0].refresh_token) {
          try {
            jwt.verify(token, SECRET);
            return callback(true);
          } catch {
            return callback(false);
          }
        } else {
          return callback(false);
        }
      });
    });
  },
};
