const express = require("express");
const app = express();
//importing routes-->
const usersRouter = require("./routes/usersRouter");
//middlewares-->
app.use(express.json());

//routing pages-->
app.use("/api/v1/users", usersRouter);

module.exports = app;
