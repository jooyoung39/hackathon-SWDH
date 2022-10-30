//db module
const dbModule = require('../db');
const pool = dbModule.getPool();

module.exports = {
  checkStatus: (callback) => {
    dbModule.open(pool, (con) => {
      con.query('SHOW TABLE STATUS', (error, result) => {
        if (error) {
          callback(error);
        } else {
          callback(null, result);
        }
      });
    });
  },
};
