//express module
const express = require("express");
const router = express.Router();

//db module
const dbModule = require("../db");
const pool = dbModule.init();

router.get("/", (req, res) => {
  dbModule.open(pool, (con) => {
    con.query("SHOW TABLE STATUS", (err, result) => {
      if (err) {
        console.log("DB communication failed: ", err);
        res.status(500).json({ message: "DB communication failed" });
      } else {
        res.json({
          ok: true,
          message: "DB connection OK",
          result: result,
        });
      }
    });
  });
});

module.exports = router;
