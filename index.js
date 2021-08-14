const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<password>",
  proccess.env.DATABASE_PASSWORD
);
//running mongoDB-->
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((success) => {
    console.log("successfully connected to mongoDB");
  });
//running server-->>
const port = process.env.PORT || 3010;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
