//db module
const dbModule = require('../db');
const pool = dbModule.getPool();

module.exports = {
  createChat: (chat, callback) => {
    dbModule.open(pool, (con) => {
      con.query(
        'INSERT INTO chats (sender_id, reciver_id, content) VALUES (?, ?, ?)',
        [chat.sender_id, chat.reciver_id, chat.content],
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
  getChatById: (id, callback) => {
    dbModule.open(pool, (con) => {
      con.query(
        'SELECT * FROM chats WHERE sender_id=? OR reciver_id=?',
        [id, id],
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
