const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

//db module
const dbModule = require('../db');
const pool = dbModule.getPool();

module.exports = {
  sign: (user) => {
    const payload = {
      user_id: user.user_id,
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
        user_id: decoded.user_id,
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
  setRefreshToken: (user_id, refreshToken, callback) => {
    dbModule.open(pool, (con) => {
      con.query(
        'INSERT INTO tokens (user_id, refresh_token) VALUES (?, ?) ON DUPLICATE KEY UPDATE user_id=?, refresh_token=?',
        [user_id, refreshToken, user_id, refreshToken],
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
  dropRefreshToken: (user_id, callback) => {
    dbModule.open(pool, (con) => {
      con.query('DELETE FROM tokens WHERE user_id=?', [user_id], (error) => {
        if (error) {
          callback(error);
        } else {
          callback(null);
        }
      });
    });
  },
  verifyRefresh: (user_id, token, callback) => {
    dbModule.open(pool, (con) => {
      con.query(
        'SELECT * FROM tokens WHERE user_id=?',
        [user_id],
        (error, result) => {
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
        }
      );
    });
  },
};
