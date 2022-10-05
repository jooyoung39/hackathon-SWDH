//express module
const express = require("express");
const router = express.Router();

//db module
const dbModule = require("../db");
const pool = dbModule.init();

router.get("/", (req, res) => {
  dbModule.open(pool, (con) => {
    con.query("SELECT * FROM medicines", function (err, result) {
      if (err) {
        console.log("DB communication failed: ", err);
        res.status(500).json({ message: "DB communication failed" });
      } else if (!result.length) {
        res.status(204).json({ message: "No medicine found" });
      } else {
        res.json({
          ok: true,
          medicines: result.map((medicine) => ({
            id: medicine.id,
            type: medicine.type,
            name: medicine.name,
            icon: medicine.icon,
          })),
        });
      }
    });
  });
});

router.get("/types", (req, res) => {
  dbModule.open(pool, (con) => {
    con.query("SELECT * FROM medicine_types", function (err, result) {
      if (err) {
        console.log("DB communication failed: ", err);
        res.status(500).json({ message: "DB communication failed" });
      } else if (!result.length) {
        res.status(204).json({ message: "No type found" });
      } else {
        res.json({
          ok: true,
          types: result.map((type) => ({
            id: type.id,
            name: type.name,
            type: type.type,
            icon: type.icon,
            iconColor: type.iconColor,
          })),
        });
      }
    });
  });
});
module.exports = router;
