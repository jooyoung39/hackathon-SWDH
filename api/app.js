//express module
const express = require("express");
const app = express();

//express-router
const indexRouter = require("./routes/index");
const accountRouter = require("./routes/account");
const symptomsRouter = require("./routes/symptoms");

//cors
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", indexRouter);
app.use("/account", accountRouter);
app.use("/symptoms", symptomsRouter);

app.listen(3000, () => console.log("YS-SWDH-Hackathon-2022!"));
