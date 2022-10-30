//db module
const dbModule = require('../db');
const pool = dbModule.getPool();

module.exports = {
  getMedicines: (callback) => {
    dbModule.open(pool, (con) => {
      con.query('SELECT * FROM medicines', (error, result) => {
        if (error) {
          callback(error);
        } else {
          callback(null, result);
        }
      });
    });
  },
  getMedicineById: (id, callback) => {
    dbModule.open(pool, (con) => {
      con.query('SELECT * FROM medicines WHERE id=?', [id], (error, result) => {
        if (error) {
          callback(error);
        } else {
          callback(null, result);
        }
      });
    });
  },
};
