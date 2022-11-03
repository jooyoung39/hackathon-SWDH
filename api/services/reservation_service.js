//db module
const dbModule = require('../db');
const pool = dbModule.getPool();

module.exports = {
  createReservation: (reservation, callback) => {
    dbModule.open(pool, (con) => {
      con.query(
        'INSERT INTO reservations (user_id, medicine_id, quantity) VALUES (?, ?, ?)',
        [reservation.user, reservation.medicine, reservation.quantity],
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
  getReservstions: (callback) => {
    dbModule.open(pool, (con) => {
      con.query('SELECT * FROM reservations', (error, result) => {
        if (error) {
          callback(error);
        } else {
          callback(null, result);
        }
      });
    });
  },
  getReservationById: (reservation_id, callback) => {
    dbModule.open(pool, (con) => {
      con.query(
        'SELECT * FROM reservations WHERE reservation_id=?',
        [reservation_id],
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
  getReservationsByUserId: (user_id, callback) => {
    dbModule.open(pool, (con) => {
      con.query(
        'SELECT * FROM reservations WHERE user_id=?',
        [user_id],
        (error, result) => {
          if (error) {
            callback(error);
          } else {
            callback(null, result);
          }
        }
      );
    });
  },
};
