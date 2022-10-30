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
          result.map((res) => {
            res.type = JSON.parse(res.type);
          });
          console.log(result[0].type, typeof result[0].type);
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
          result[0].type = JSON.parse(result[0].type);
          callback(null, result[0]);
        }
      });
    });
  },
};
