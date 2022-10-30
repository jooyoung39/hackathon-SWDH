//db module
const dbModule = require('../db');
const pool = dbModule.getPool();

module.exports = {
  checkStatus: (callback) => {
    dbModule.open(pool, (con) => {
      con.query('SELECT now()', (error, result) => {
        if (error) {
          callback(error);
        } else {
          callback(null, result[0]['now()']);
        }
      });
    });
  },
};
