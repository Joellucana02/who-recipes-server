const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
//importing routes-->
const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");
//middlewares-->
app.use(express.json());
app.use(cookieParser());
app.use(cors());
//routing pages-->
app.get("/set-cookie", (req, res) => {
  res.cookie("mySuperCookie", false);
  res.status(200).json({ hi: "u got the cookies" });
});
app.use("/api/v1", authRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/users", usersRouter);

module.exports = app;
