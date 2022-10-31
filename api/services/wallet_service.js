//db module
const dbModule = require('../db');
const pool = dbModule.getPool();

module.exports = {
  getWalletById: (user_id, callback) => {
    dbModule.open(pool, (con) => {
      con.query(
        'SELECT * FROM wallets WHERE user_id=?',
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
