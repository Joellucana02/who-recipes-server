const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
//running mongoDB-->
mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("successfully connected to mongoDB");
  });
//running server-->>
const port = process.env.PORT || 3010;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
