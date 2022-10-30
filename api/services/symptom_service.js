//db module
const dbModule = require('../db');
const pool = dbModule.getPool();

module.exports = {
  getSymptoms: (callback) => {
    dbModule.open(pool, (con) => {
      con.query('SELECT * FROM symptoms', (error, result) => {
        if (error) {
          callback(error);
        } else {
          callback(null, result);
        }
      });
    });
  },
  getSymptomById: (id, callback) => {
    dbModule.open(pool, (con) => {
      con.query('SELECT * FROM symptoms WHERE id=?', [id], (error, result) => {
        if (error) {
          callback(error);
        } else {
          callback(null, result);
        }
      });
    });
  },
};
