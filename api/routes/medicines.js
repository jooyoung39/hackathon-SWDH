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
            name: medicine.name,
            quantity: medicine.quantity,
            icon: medicine.icon,
            type: medicine.type,
            ingredient: medicine.ingredient,
            effect: medicine.effect,
            dosage: medicine.dosage,
          })),
        });
      }
    });
  });
});

router.post("/", (req, res) => {
  const id = req.query.id;
  const name = req.query.name;
  const icon = req.query.icon;
  const type = req.query.type;
  const ingredient = req.query.ingredient;
  const effect = req.query.effect;
  const dosage = req.query.dosage;

  dbModule.open(pool, (con) => {
    con.query(
      "INSERT INTO medicines (id, name, quantity, icon, type, ingredient, effect, dosage) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, name, 0, icon, type, ingredient, effect, dosage],
      function (err, result) {
        if (err) {
          console.log("DB communication failed: ", err);
          res.status(500).json({ message: "DB communication failed" });
        } else {
          res.json({
            ok: true,
            medicine: {
              id: id,
              name: name,
              quantity: 0,
              type: type,
              ingredient: ingredient,
              effect: effect,
              dosage: dosage,
            },
          });
        }
      }
    );
  });
});

router.put("/", (req, res) => {
  const id = req.query.id;
  const quantity = req.query.quantity;

  dbModule.open(pool, (con) => {
    con.query("UPDATE medicines SET quantity=? WHERE id=?", [quantity, id], (err, result) => {
      if (err) {
        console.log("DB communication failed: ", err);
        res.status(500).json({ message: "DB communication failed" });
      } else {
        res.json({
          ok: true,
          medicine: {
            id: id,
            quantity: quantity,
          },
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
