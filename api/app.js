//express module
const express = require("express");
const app = express();

//express-router
const indexRouter = require("./routes/index");
const accountRouter = require("./routes/account");

app.use("/", indexRouter);
app.use("/account", accountRouter);

app.listen(3000, () => console.log("YS-SWDH-Hackathon-2022!"));
