const express = require("express");
const app = express();
//importing routes-->
const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authRouter");
//middlewares-->
app.use(express.json());

//routing pages-->
app.use("/api/v1/users", usersRouter);
app.use("/api/v1", authRouter);

module.exports = app;
