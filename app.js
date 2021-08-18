const express = require("express");
const app = express();
//importing routes-->
const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");
//middlewares-->
app.use(express.json());

//routing pages-->
app.use("/api/v1", authRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/users", usersRouter);

module.exports = app;
