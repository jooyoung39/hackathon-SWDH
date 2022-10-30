//express module
const express = require("express");
const router = express.Router();

//db module
const dbModule = require("../db");
const pool = dbModule.init();

router.get("/", (req, res) => {
  dbModule.open(pool, (con) => {
    con.query("SELECT * FROM symptoms", function (err, result) {
      if (err) {
        console.log("DB communication failed: ", err);
        res.status(500).json({ message: "DB communication failed" });
      } else if (!result.length) {
        res.status(204).json({ message: "No symptom found" });
      } else {
        res.json({
          ok: true,
          symptoms: result.map((symptom) => ({
            id: symptom.id,
            name: symptom.name,
            icon: symptom.icon,
            iconColor: symptom.iconColor,
            type: JSON.parse(symptom.type),
          })),
        });
      }
    });
  });
});

module.exports = router;
