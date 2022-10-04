const express = require("express");
const app = express();
const port = 3000;

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "db.lunabi.co.kr",
  user: "swdh-api",
  password: "dustpgozjxhs",
});

app.get("/", (req, res) => {
  connection.connect();

  connection.query("SELECT 1 + 1 AS solution", function (err, rows, fields) {
    if (err) throw err;
    res.send("The solution is: " + rows[0].solution);
  });

  connection.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
