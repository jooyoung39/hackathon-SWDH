//express module
const express = require("express");
const router = express.Router();

//node module
const crypto = require("crypto");

//db module
const dbModule = require("../db");
const pool = dbModule.init();

router.get("/", (req, res) => {
  const id = req.query.id;
  const password = req.query.password;

  dbModule.open(pool, (con) => {
    con.query("SELECT salt FROM students WHERE id=?", [id], function (err, result) {
      if (err) {
        console.log("DB communication failed: ", err);
        res.status(500).json({ message: "DB communication failed" });
      } else if (!result.length) {
        res.status(204).json({ message: "No account found" });
      } else {
        const hash = crypto.createHash("sha512").update(password.concat(result[0].salt)).digest("hex");

        con.query("SELECT * FROM students WHERE id=? AND hash=?", [id, hash], function (err, result) {
          if (err) {
            console.log("DB communication failed: ", err);
            res.status(500).json({ message: "DB communication failed" });
          } else if (!result.length) {
            res.status(204).json({ message: "No account found" });
          } else {
            res.json({
              ok: true,
              account: {
                id: result[0].id,
                name: result[0].name,
                is_healthcare: result[0].is_healthcare,
              },
            });
          }
        });
      }
    });
  });
});

router.post("/register", (req, res) => {
  const id = req.query.id;
  const password = req.query.password;
  const name = req.query.name;
  const is_healthcare = req.query.isHealthcare;

  dbModule.open(pool, (con) => {
    con.query("SELECT * FROM students WHERE id=?", [id], function (err, result) {
      if (err) {
        console.log("DB communication failed: ", err);
        res.status(500).json({ message: "DB communication failed" });
      } else if (result.length) {
        res.status(409).json({ message: "Already exist" });
      } else {
        const salt = crypto.createHash("sha512").update(crypto.randomBytes(20).toString("base64")).digest("hex");

        const hash = crypto.createHash("sha512").update(password.concat(salt)).digest("hex");

        con.query(
          "INSERT INTO students (id, hash, salt, name, is_healthcare) VALUES (?, ?, ?, ?, ?)",
          [id, hash, salt, name, is_healthcare],
          function (err, result) {
            if (err) {
              console.log("DB communication failed: ", err);
              res.status(500).json({ message: "DB communication failed" });
            } else {
              res.json({
                ok: true,
                account: {
                  id: id,
                  pass: hash,
                  salt: salt,
                  name: name,
                  isHealthcare: is_healthcare,
                },
              });
            }
          }
        );
      }
    });
  });
});

module.exports = router;
